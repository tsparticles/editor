import { type EditorGroup, EditorType } from "object-gui";
import type { Container } from "@tsparticles/engine";
import { EditorBase } from "../../../../EditorBase";

export class RollOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => unknown;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("roll", "Roll");
        this.options = this.group.data;

        this.addDarken();
        this.addEnlighten();
        this.addProperties();
    }

    private addDarken(): void {
        const group = this.group.addGroup("darken", "Darken");

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addEnlighten(): void {
        const group = this.group.addGroup("enlighten", "Enlighten");

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        const optionsFunc = this.options as () => unknown,
            options = optionsFunc() as {
                backColor: string | unknown[] | { value: unknown };
            },
            getColor = (): unknown => {
                if (typeof options.backColor === "string") {
                    return options.backColor;
                } else {
                    if (options.backColor instanceof Array) {
                        return options.backColor[0];
                    } else {
                        return options.backColor?.value;
                    }
                }
            },
            color = getColor();

        this.group.addProperty("backColor", "Back Color", EditorType.color, color, false).change((value: unknown) => {
            const options = optionsFunc() as {
                backColor: string | unknown[] | { value: unknown };
            };

            if (typeof value === "string") {
                if (typeof options.backColor === "string") {
                    options.backColor = value;
                } else {
                    if (options.backColor === undefined) {
                        options.backColor = {
                            value: value,
                        };
                    } else {
                        if (options.backColor instanceof Array) {
                            options.backColor = {
                                value: value,
                            };
                        } else {
                            options.backColor.value = value;
                        }
                    }
                }
            }

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
