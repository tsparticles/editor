import type { Container, IShadow } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class ShadowOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IShadow;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("shadow", "Shadow");
        this.options = this.group.data as () => IShadow;

        this.addOffset();
        this.addProperties();
    }

    private addOffset(): void {
        const group = this.group.addGroup("offset", "Offset");

        group.addProperty("x", "X", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("y", "Y", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        const optionsFunc = (): IShadow => this.options();
        const options = optionsFunc();
        const color = typeof options.color === "string" ? options.color : options.color?.value;

        this.group.addProperty("blur", "Blur", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("color", "Color", EditorType.color, color, false).change((value: unknown) => {
            if (typeof value === "string") {
                if (typeof options.color === "string") {
                    options.color = value;
                } else {
                    options.color.value = value;
                }
            }

            void this.particles().refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }
}
