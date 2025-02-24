import { component$, useSignal, useTask$ } from "@builder.io/qwik";



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
    return (
        <img
            width={size}
            height={size}
            src={!isFront ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
            alt="Pokemon Sprite"
            style= "border-radius: 50%; width: 96px;"
            onLoad$={() => {
                imageLoaded.value = true
            } }
            class={imageLoaded.value ? '' : 'hidden'}
        />
    );
})