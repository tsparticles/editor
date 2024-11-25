import type { Container, IParticlesBounce } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class BounceOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IParticlesBounce;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("bounce", "Bounce");
        this.options = this.group.data as () => IParticlesBounce;

        this.addFactors();
    }

    private addFactor(name: string, title: string): void {
        const group = this.group.addGroup(name, title),
            randomGroup = group.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        randomGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addFactors(): void {
        this.addFactor("horizontal", "Horizontal");
        this.addFactor("vertical", "Vertical");
    }
}
