"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const zip_1 = require("./zip");
const erc20_1 = require("./erc20");
const erc721_1 = require("./erc721");
const sources_1 = require("./generate/sources");
const build_generic_1 = require("./build-generic");
(0, ava_1.default)('erc20 basic', t => {
    const c = (0, erc20_1.buildERC20)({ name: 'MyToken', symbol: 'MTK' });
    const zip = (0, zip_1.zipContract)(c);
    const files = Object.values(zip.files).map(f => f.name).sort();
    t.deepEqual(files, [
        '@openzeppelin/',
        '@openzeppelin/contracts/',
        '@openzeppelin/contracts/README.md',
        '@openzeppelin/contracts/token/',
        '@openzeppelin/contracts/token/ERC20/',
        '@openzeppelin/contracts/token/ERC20/ERC20.sol',
        '@openzeppelin/contracts/token/ERC20/IERC20.sol',
        '@openzeppelin/contracts/token/ERC20/extensions/',
        '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol',
        '@openzeppelin/contracts/utils/',
        '@openzeppelin/contracts/utils/Context.sol',
        'MyToken.sol',
    ]);
});
(0, ava_1.default)('erc721 auto increment', t => {
    const c = (0, erc721_1.buildERC721)({ name: 'MyToken', symbol: 'MTK', mintable: true, incremental: true });
    const zip = (0, zip_1.zipContract)(c);
    const files = Object.values(zip.files).map(f => f.name).sort();
    t.deepEqual(files, [
        '@openzeppelin/',
        '@openzeppelin/contracts/',
        '@openzeppelin/contracts/README.md',
        '@openzeppelin/contracts/access/',
        '@openzeppelin/contracts/access/Ownable.sol',
        '@openzeppelin/contracts/token/',
        '@openzeppelin/contracts/token/ERC721/',
        '@openzeppelin/contracts/token/ERC721/ERC721.sol',
        '@openzeppelin/contracts/token/ERC721/IERC721.sol',
        '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol',
        '@openzeppelin/contracts/token/ERC721/extensions/',
        '@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol',
        '@openzeppelin/contracts/utils/',
        '@openzeppelin/contracts/utils/Address.sol',
        '@openzeppelin/contracts/utils/Context.sol',
        '@openzeppelin/contracts/utils/Counters.sol',
        '@openzeppelin/contracts/utils/Strings.sol',
        '@openzeppelin/contracts/utils/introspection/',
        '@openzeppelin/contracts/utils/introspection/ERC165.sol',
        '@openzeppelin/contracts/utils/introspection/IERC165.sol',
        '@openzeppelin/contracts/utils/math/',
        '@openzeppelin/contracts/utils/math/Math.sol',
        'MyToken.sol',
    ]);
});
(0, ava_1.default)('erc721 auto increment uups', t => {
    const c = (0, erc721_1.buildERC721)({ name: 'MyToken', symbol: 'MTK', mintable: true, incremental: true, upgradeable: 'uups' });
    const zip = (0, zip_1.zipContract)(c);
    const files = Object.values(zip.files).map(f => f.name).sort();
    t.deepEqual(files, [
        '@openzeppelin/',
        '@openzeppelin/contracts-upgradeable/',
        '@openzeppelin/contracts-upgradeable/README.md',
        '@openzeppelin/contracts-upgradeable/access/',
        '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/interfaces/',
        '@openzeppelin/contracts-upgradeable/interfaces/draft-IERC1822Upgradeable.sol',
        '@openzeppelin/contracts-upgradeable/proxy/',
        '@openzeppelin/contracts-upgradeable/proxy/ERC1967/',
        '@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/proxy/beacon/',
        '@openzeppelin/contracts-upgradeable/proxy/beacon/IBeaconUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/proxy/utils/',
        '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol',
        '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/token/',
        '@openzeppelin/contracts-upgradeable/token/ERC721/',
        '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol',
        '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol',
        '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/',
        '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/',
        '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/introspection/',
        '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol',
        '@openzeppelin/contracts-upgradeable/utils/math/',
        '@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol',
        'MyToken.sol',
    ]);
});
(0, ava_1.default)('can zip all combinations', t => {
    for (const { options } of (0, sources_1.generateSources)('all')) {
        const c = (0, build_generic_1.buildGeneric)(options);
        (0, zip_1.zipContract)(c);
    }
    t.pass();
});
//# sourceMappingURL=zip.test.js.map