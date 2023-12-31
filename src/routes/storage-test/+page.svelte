<script lang="ts">
  import DownloadURL from "$lib/components/DownloadURL.svelte";
  import StorageList from "$lib/components/StorageList.svelte";
  import UploadTask from "$lib/components/UploadTask.svelte";

  let file: any;

  function makeFile() {
    file = new Blob(["test"], { type: "text/plain" });
  }

  function chooseFile(e: any) {
    file = e.target.files[0];
  }
</script>

<h1>Storage Test</h1>

<h2>Storage List</h2>

<StorageList ref="/" let:list>
  <ul>
    {#if list === null}
      <li>Loading...</li>
    {:else if list.prefixes.length === 0 && list.items.length === 0}
      <li>Empty</li>
    {:else}
      {#each list.items as item}
        <li>
          <DownloadURL ref={item} let:link let:ref>
            <a data-testid="download-link" href={link} download>{ref?.name}</a>
          </DownloadURL>
        </li>
      {/each}
    {/if}
  </ul>
</StorageList>

<h2>Error handling (trying to fetch an invalid ref)</h2>

<DownloadURL ref={'invalid'} let:error>
  <p data-testid="download-url-error" >{error?.message}</p>
</DownloadURL>

<h2>Upload Task</h2>

<input type="file" on:change={chooseFile} />
<button on:click={makeFile}>Make File</button>

{#if file}
  <UploadTask ref="test-upload.txt" data={file} let:progress let:snapshot>
    {#if snapshot?.state === "running" || snapshot?.state === "success"}
      <p data-testid="progress">{progress}% uploaded</p>
    {/if}

    {#if snapshot?.state === "error"}
      Upload failed
    {/if}

    {#if snapshot?.state === "success"}
      <DownloadURL ref={snapshot?.ref} let:link let:ref>
        <a data-testid="download-link2" href={link} download> {ref?.name} </a>
      </DownloadURL>
    {/if}
  </UploadTask>
{/if}
