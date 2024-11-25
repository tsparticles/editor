import { type EditorGroup, EditorType } from "object-gui";
import type { Container } from "@tsparticles/engine";
import { EditorBase } from "../../../EditorBase";

export class MotionOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: () => unknown;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("motion", "Motion");
        this.options = this.group.data;

        this.addReduce();
        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("disable", "Disable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }

    private addReduce(): void {
        const coverGroup = this.group.addGroup("reduce", "Reduce");

        coverGroup
            .addProperty("factor", "Factor", EditorType.number)
            .change(() => {
                void this.particles().refresh();
            })
            .step(1);

        coverGroup.addProperty("value", "Value", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }
}
