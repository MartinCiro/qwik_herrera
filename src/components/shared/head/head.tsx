import { DocumentHead } from "@builder.io/qwik-city";

export const head = (title: string = "Qwik Empty App", description: string = "Qwik empty app"): DocumentHead => ({
    title,
    meta: [
        {
            name: "description",
            content: description,
        },
    ],
});
