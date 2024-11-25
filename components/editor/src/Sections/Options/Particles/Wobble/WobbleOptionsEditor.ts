import { type EditorGroup, EditorType } from "object-gui";
import type { Container } from "@tsparticles/engine";
import { EditorBase } from "../../../../EditorBase";

export class WobbleOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("wobble", "Wobble");
        this.options = this.group.data;

        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("distance", "Distance", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("speed", "Speed", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
