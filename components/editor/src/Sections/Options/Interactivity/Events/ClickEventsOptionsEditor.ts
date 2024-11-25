import { type Container, type IClickEvent } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";

export class ClickEventsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IClickEvent;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onClick", "Click Events");
        this.options = this.group.data as () => IClickEvent;

        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        const modeSelectInput = this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: "attract",
                },
                {
                    value: "bubble",
                },
                {
                    value: "pause",
                },
                {
                    value: "push",
                },
                {
                    value: "remove",
                },
                {
                    value: "repulse",
                },
                {
                    value: "trail",
                },
            ]);

        if (typeof loadAbsorbersPlugin !== "undefined") {
            const absorbersGroup = "Absorbers";

            modeSelectInput.addItemGroup(absorbersGroup);
            modeSelectInput.addItem("absorber", undefined, absorbersGroup);
        }

        if (typeof loadEmittersPlugin !== "undefined") {
            const emittersGroup = "Emitters";

            modeSelectInput.addItemGroup(emittersGroup);
            modeSelectInput.addItem("emitter", undefined, emittersGroup);
        }
    }
}
