import { mount, type SvelteComponent, unmount } from "svelte";
export function mountComponent(
    targetElement: HTMLElement,
    component: typeof SvelteComponent,
    props: Record<string, any>,
) {
    // Ensure the target element is empty before mounting
    const app = mount(component, {
        target: targetElement,
        props: props,
    });
    const _unmount = () => {
        unmount(app);
        app.$destroy();
    };

    return {
        app,
        unmount: () => _unmount(),
    };
}
export function defineComponent(
    name: string,
    component: typeof SvelteComponent,
    options?: ElementDefinitionOptions,
) {
    customElements.define(name, component.element!, options);
}
export function defineFormComponent(
    name: string,
    component: typeof SvelteComponent,
    options?: ElementDefinitionOptions,
) {
    /**
     * Wraps a Svelte component to make it form-associated.
     * This allows the component to be used in forms and participate in form submission.
     */
    class WrappedFormComponent extends component.element! {
        static formAssociated = true;
        internals_: ElementInternals;

        constructor() {
            super();
            this.internals_ = this.attachInternals();
        }

        get value() {
            return this.getAttribute("value") || "";
        }
        set value(val: string) {
            this.setAttribute("value", val);
        }
        static observedAttributes = ["name", "value"];
        attributeChangedCallback(name: any, oldValue: any, newValue: any) {
            if (name === "value") {
                this.internals_.setFormValue(newValue);
            } else if (name === "name") {
                this.internals_.setFormValue(this.value!);
            }
        }
        get form() {
            return this.internals_.form;
        }
    }
    customElements.define(name, WrappedFormComponent, {
        ...options,
    });
}
