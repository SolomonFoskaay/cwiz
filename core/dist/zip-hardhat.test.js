"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const zip_hardhat_1 = require("./zip-hardhat");
const erc20_1 = require("./erc20");
const erc721_1 = require("./erc721");
const erc1155_1 = require("./erc1155");
const custom_1 = require("./custom");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const util_1 = __importStar(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const rimraf_1 = __importDefault(require("rimraf"));
const rimraf = (0, util_1.promisify)(rimraf_1.default);
ava_1.default.serial('erc20 basic', async (t) => {
    const opts = { kind: 'ERC20', name: 'My Token', symbol: 'MTK' };
    const c = (0, erc20_1.buildERC20)(opts);
    await runTest(c, t, opts);
});
ava_1.default.serial('erc721 upgradeable', async (t) => {
    const opts = { kind: 'ERC721', name: 'My Token', symbol: 'MTK', upgradeable: 'uups' };
    const c = (0, erc721_1.buildERC721)(opts);
    await runTest(c, t, opts);
});
ava_1.default.serial('erc1155 basic', async (t) => {
    const opts = { kind: 'ERC1155', name: 'My Token', uri: 'https://myuri/{id}' };
    const c = (0, erc1155_1.buildERC1155)(opts);
    await runTest(c, t, opts);
});
ava_1.default.serial('custom basic', async (t) => {
    const opts = { kind: 'Custom', name: 'My Contract' };
    const c = (0, custom_1.buildCustom)(opts);
    await runTest(c, t, opts);
});
ava_1.default.serial('custom upgradeable', async (t) => {
    const opts = { kind: 'Custom', name: 'My Contract', upgradeable: 'transparent' };
    const c = (0, custom_1.buildCustom)(opts);
    await runTest(c, t, opts);
});
async function runTest(c, t, opts) {
    const zip = await (0, zip_hardhat_1.zipHardhat)(c, opts);
    assertLayout(zip, t, c);
    await extractAndRunPackage(zip, t);
    await assertContents(zip, c, t);
}
function assertLayout(zip, t, c) {
    const sorted = Object.values(zip.files).map(f => f.name).sort();
    t.deepEqual(sorted, [
        '.gitignore',
        'README.md',
        'contracts/',
        `contracts/${c.name}.sol`,
        'hardhat.config.ts',
        'package-lock.json',
        'package.json',
        'scripts/',
        'scripts/deploy.ts',
        'test/',
        'test/test.ts',
        'tsconfig.json',
    ]);
}
async function extractAndRunPackage(zip, t) {
    const files = Object.values(zip.files);
    const tempFolder = await fs_1.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'openzeppelin-wizard-'));
    try {
        const items = Object.values(files);
        for (const item of items) {
            if (item.dir) {
                await fs_1.promises.mkdir(path_1.default.join(tempFolder, item.name));
            }
            else {
                await fs_1.promises.writeFile(path_1.default.join(tempFolder, item.name), await asString(item));
            }
        }
        const exec = util_1.default.promisify(child_process_1.default.exec);
        const result = await exec(`cd "${tempFolder}" && npm config set scripts-prepend-node-path auto && npm install && npm test && npx hardhat run scripts/deploy.ts`);
        t.regex(result.stdout, /1 passing/);
        t.regex(result.stdout, /deployed to/);
    }
    finally {
        await rimraf(tempFolder);
    }
}
async function assertContents(zip, c, t) {
    const contentComparison = [
        await getItemString(zip, `contracts/${c.name}.sol`),
        await getItemString(zip, 'hardhat.config.ts'),
        await getItemString(zip, 'package.json'),
        await getItemString(zip, 'scripts/deploy.ts'),
        await getItemString(zip, 'test/test.ts'),
    ];
    t.snapshot(contentComparison);
}
async function getItemString(zip, key) {
    const obj = zip.files[key];
    if (obj === undefined) {
        throw Error(`Item ${key} not found in zip`);
    }
    return await asString(obj);
}
async function asString(item) {
    return Buffer.from(await item.async('arraybuffer')).toString();
}
//# sourceMappingURL=zip-hardhat.test.js.map