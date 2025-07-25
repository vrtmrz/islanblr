<script lang="ts">
    import { onMount } from "svelte";

    async function testAPI() {
        try {
            const response = await fetch("/api");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    }
    onMount(() => {
        console.log("Index1 component mounted");
        testAPI();
    });
</script>

<div>Hello world! Index1</div>
<pre></pre>
