<!-- Edit contracts modules dislayed on frondend in the Core/SRC/erc20.ts etc file. -->


<script>
  import hljs from './highlightjs';
	import { injectHyperlinks } from "./utils/inject-hyperlinks";


  // import OverflowMenu from "./OverflowMenu.svelte";

  let tab = 'ERC20';

  $: highlightedCode = injectHyperlinks(hljs.highlight('solidity', code).value);
</script>


<h1 class="text-3xl font-bold underline ">
  WELCOME TO CWIZ
</h1>

<div class="container flex flex-col gap-4 p-4">
  <div class="header flex flex-row justify-between">
    <div class="tab overflow-hidden">
      <!-- <OverflowMenu> -->
        <button class:selected={tab === 'ERC20'} on:click={() => tab = 'ERC20'}>
          ERC202
        </button>
        <button class:selected={tab === 'ERC721'} on:click={() => tab = 'ERC721'}>
          Flow NFT
        </button>
        <button class:selected={tab === 'ERC1155'} on:click={() => tab = 'ERC1155'}>
          Flow Coin
        </button>
        <button class:selected={tab === 'Governor'} on:click={() => tab = 'Governor'}>
          CryptoKitties
        </button>
        <button class:selected={tab === 'Custom'} on:click={() => tab = 'Custom'}>
          Custom
        </button>
      <!-- </OverflowMenu> -->
    </div>
  </div>
    
  <div class="flex flex-row gap-4 grow">
    <div class="controls w-64 flex flex-col shrink-0 justify-between">
      <div class:hidden={tab !== 'ERC20'}>
          <!-- <ERC20Controls bind:opts={allOpts.ERC20} /> -->
          ERC20 Controls
      </div>
      <div class:hidden={tab !== 'ERC721'}>
          <!-- <ERC721Controls bind:opts={allOpts.ERC721} /> -->
          ERC721 Controls
      </div>
      <div class:hidden={tab !== 'ERC1155'}>
          <!-- <ERC1155Controls bind:opts={allOpts.ERC1155} /> -->
          ERC1155 Controls
      </div>
      <div class:hidden={tab !== 'Governor'}>
          <!-- <GovernorControls bind:opts={allOpts.Governor} errors={errors.Governor} /> -->
        Governor  Controls
      </div>
      <div class:hidden={tab !== 'Custom'}>
          <!-- <CustomControls bind:opts={allOpts.Custom} /> -->
          Custom Control
      </div>
    </div>
  
    <div class="output flex flex-col grow overflow-auto">
      <pre class="flex flex-col grow basis-0 overflow-auto">
          <code class="hljs grow overflow-auto p-4">
            {@html highlightedCode}
            Highlighted Code Here
            Highlighted Code Here
            Highlighted Code Here
            Highlighted Code Here
            Highlighted Code Here
          </code>
      </pre>
    </div>
  </div>
</div>



<style lang="postcss">
  .container {
    background-color: var(--gray-1);
    border: 1px solid var(--gray-2);
    border-radius: 10px;
    min-width: 32rem;
    min-height: 53rem;
  }

  .header {
    font-size: var(--text-small);
  }

  .tab {
    color: var(--gray-5);
  }

  /* .tab button, .action-button, :global(.overflow-btn) {
    padding: var(--size-2) var(--size-3);
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  } */

  .tab button, :global(.overflow-btn) {
    border: 0;
    background-color: transparent;
  }

  .tab button:hover, :global(.overflow-btn):hover {
    background-color: var(--gray-2);
  }

  .tab button.selected {
    background-color: var(--solidity-blue-2);
    color: white;
    order: -1;
  }

  :global(.overflow-menu) button.selected {
    order: unset;
  }

  .action-button {
    background-color: var(--gray-1);
    border: 1px solid var(--gray-3);
    color: var(--gray-6);
    cursor: pointer;

    &:hover {
      background-color: var(--gray-2);
    }

    &:active, &.active {
      background-color: var(--gray-2);
    }

    &.disabled {
      color: var(--gray-4);
    }

    :global(.icon) {
      margin-right: var(--size-1);
    }
  }

  .controls {
    background-color: white;
    padding: var(--size-4);
  }

  .controls, .output {
    border-radius: 5px;
    box-shadow: var(--shadow);
  }

  .controls-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: var(--gray-5);
    margin-top: var(--size-3);
    padding: 0 var(--size-2);
    font-size: var(--text-small);

    & > * + * {
      margin-left: var(--size-3);
    }

    :global(.icon) {
      margin-right: 0.2em;
      opacity: .8;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--text-color);
      }
    }
  }

  .download-option {
    display: flex;
    padding: var(--size-2);
    text-align: left;
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;

    :global(.icon) {
      margin-top: var(--icon-adjust);
    }

    :not(:hover) + & {
      border-top: 1px solid var(--gray-2);
    }

    &:hover,
    &:focus, {
      background-color: var(--gray-1);
      border: 1px solid var(--gray-3);
    }

    & div {
      display: block;
    }
  }

  .download-option-content {
    margin-left: var(--size-3);
    font-size: var(--text-small);

    & > :first-child {
      margin-bottom: var(--size-2);
      color: var(--gray-6);
      font-weight: bold;
    }

    & > :not(:first-child) {
      margin-top: var(--size-1);
      color: var(--gray-5);
    }
  }

  .download-zip-beta {
    text-transform: uppercase;
    padding: 0 .2em;
    border: 1px solid;
    border-radius: 4px;
    font-size: .8em;
    margin-left: .25em;
  }
</style>

