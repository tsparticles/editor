import type { Container, IAnimatableColor } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class ColorOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IAnimatableColor;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: () => unknown): void {
        this.group = parent.addGroup("color", "Color", true, options);
        this.options = this.group.data as () => IAnimatableColor;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("value", "Value", EditorType.color).change(() => {
            void this.particles().refresh();
        });
    }
}
