import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    id: number | string;
    size?: number;
    isFront?: boolean;
}

export const PokemonImage = component$(({ id, size=96, isFront = false  }: Props) => {
    const imageLoaded = useSignal(false);
    useTask$(({ track }) => {
        track(() => id);
        imageLoaded.value = false
    })

    const imageUrl = useComputed$(() => {

        return (!isFront) ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    })


    return (
        <img
            width={size}
            height={size}
            src={imageUrl.value}
            alt="Pokemon Sprite"
            style= "border-radius: 50%; width: 96px;"
            onLoad$={() => {
                imageLoaded.value = true
            } }
            class={imageLoaded.value ? '' : 'hidden'}
        />
    );
})