import { type Container, DivType, type IDivEvent, type SingleOrMultiple } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class DivsEventsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => SingleOrMultiple<IDivEvent>;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onDiv", "Divs Events");
        this.options = this.group.data as () => SingleOrMultiple<IDivEvent>;

        this.addDivs();

        if (this.options() instanceof Array) {
            this.group.addButton("addDiv", "Add Div", false).click(() => {
                const arr = this.options() as IDivEvent[];
                const divGroup = this.group.addGroup(
                    arr.length.toString(10),
                    `Div ${arr.length + 1}`,
                    true,
                    this.options,
                );

                this.addDiv(divGroup);

                void this.particles().refresh();
            });
        }
    }

    private addDiv(group: EditorGroup): void {
        const options = group.data as () => IDivEvent;

        if (options().selectors instanceof Array) {
            const selectorsGroup = group.addGroup("selectors", "Selectors");

            selectorsGroup.addButton("addSelector", "Add Selector", false).click(() => {
                const arr = options().selectors as string[];

                selectorsGroup
                    .addProperty(arr.length.toString(10), `Selector ${arr.length + 1}`, EditorType.string)
                    .change(() => {
                        void this.particles().refresh();
                    });

                void this.particles().refresh();
            });
        } else {
            group.addProperty("selectors", "Selectors", EditorType.string).change(() => {
                void this.particles().refresh();
            });
        }

        group
            .addProperty("enable", "Enable", EditorType.boolean)
            .change(() => {
                void this.particles().refresh();
            })
            .step(0.01)
            .min(0)
            .max(1);

        this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: "bounce",
                },
                {
                    value: "bubble",
                },
                {
                    value: "repulse",
                },
            ]);

        group
            .addProperty("type", "Type", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: DivType.circle,
                },
                {
                    value: DivType.rectangle,
                },
            ]);
    }

    private addDivs(): void {
        const options = this.options;

        if (options() instanceof Array) {
            for (let i = 0; i < options.length; i++) {
                const group = this.group.addGroup(i.toString(10), `Div_${i + 1}`, true, options);

                this.addDiv(group);
            }
        } else {
            this.addDiv(this.group);
        }
    }
}
