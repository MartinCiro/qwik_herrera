import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
    const counter = useSignal(initialValue);

    const increment = $((value: number) => {
        counter.value += value;
    });

    const decrement = $((value: number) => {
        counter.value -= value;
    })
    return {
        counter: useComputed$(() => counter.value),
        increment,
        decrement
    };
};