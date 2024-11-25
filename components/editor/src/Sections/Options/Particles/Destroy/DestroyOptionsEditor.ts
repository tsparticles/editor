import { type EditorGroup, EditorType } from "object-gui";
import type { Container } from "@tsparticles/engine";
import { EditorBase } from "../../../../EditorBase";

export class DestroyOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("destroy", "Destroy");
        this.options = this.group.data;

        this.addSplit();
        this.addProperties();
    }

    private addProperties(): void {
        const group = this.group;

        group
            .addProperty("mode", "Mode", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: "none",
                },
                {
                    value: "split",
                },
            ]);
    }

    private addSplit(): void {
        const group = this.group.addGroup("split", "Split");

        const factorGroup = group.addGroup("factor", "Factor");

        const randomFactorGroup = factorGroup.addGroup("random", "Random");

        randomFactorGroup.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        randomFactorGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        factorGroup.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        const rateGroup = group.addGroup("rate", "Rate");

        const randomRateGroup = rateGroup.addGroup("random", "Random");

        randomRateGroup.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        randomRateGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        rateGroup.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("count", "Count", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
