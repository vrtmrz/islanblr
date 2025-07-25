<svelte:options
    customElement={{
        props: {
            name: { reflect: true, type: "String", attribute: "name" },
            value: { reflect: true, type: "String", attribute: "value" },
        },
    }}
/>

<script lang="ts">
    type InputExProps = {
        value: string;
        name?: string;
    };

    let { value = $bindable(), name }: InputExProps = $props();
    let editingValue = $state(value);
    const commit = (evt: any) => {
        evt.preventDefault();
        value = editingValue;
    };
</script>

<input
    type="text"
    placeholder="Type here..."
    bind:value={editingValue}
/><button onclick={commit}>Commit</button>
