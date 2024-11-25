import type { Container, IParticlesNumber } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class NumberOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IParticlesNumber;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("number", "Number");
        this.options = this.group.data as () => IParticlesNumber;

        this.addDensity();
        this.addProperties();
    }

    private addDensity(): void {
        const group = this.group.addGroup("density", "Density");

        group.addProperty("area", "Area", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("factor", "Factor", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("limit", "Limit", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("max", "Max", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
