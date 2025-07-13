//import {Formio} from "https://cdn.jsdelivr.net/npm/formiojs@4.21.6/+esm";
const NumberComponent = Formio.Components.components.number;

export default class Slider extends NumberComponent {
    static editForm(...extend) {
        return NumberComponent.editForm([
            {
                key: 'data',
                components: [
                    {
                        type: 'number',
                        label: 'Minimum Value',
                        key: 'min',
                        input: true,
                        placeholder: 'Minimum Value',
                        weight: 20,
                        defaultValue: 0,
                    },
                    {
                        type: 'number',
                        label: 'Maximum Value',
                        key: 'max',
                        input: true,
                        placeholder: 'Maximum Value',
                        weight: 22,
                        defaultValue: 100,
                    },
                    {
                        key: 'step',
                        type: 'number',
                        weight: 24,
                        input: true,
                        label: 'Step',
                        placeholder: 'Step',
                        tooltip: 'Specifies the granularity that the value must adhere to. Treats value 0 as "any"',
                        defaultValue: 1,
                    },
                    {
                        key: 'delimiter',
                        ignore: true,
                    },
                    {
                        key: 'decimalLimit',
                        ignore: true,
                    },
                    {
                        key: 'requireDecimal',
                        ignore: true,
                    },
                    {
                        key: 'inputFormat',
                        ignore: true,
                    },
                    {
                        key: 'truncateMultipleSpaces',
                        ignore: true,
                    },
                ],
            },
            {
                key: 'display',
                components: [
                    {
                        key: 'placeholder',
                        ignore: true,
                    },
                ],
            },
            {
                key: 'validation',
                components: [
                    {
                        key: 'validate.min',
                        ignore: true,
                    },
                    {
                        key: 'validate.max',
                        ignore: true,
                    },
                ],
            },
        ], ...extend);
    }

    /**
     * This is the default schema of your custom component. It will "derive"
     * from the base class "schema" and extend it with its default JSON schema
     * properties. The most important are "type" which will be your component
     * type when defining new components.
     *
     * @param extend - This allows classes deriving from this component to 
     *                 override the schema of the overridden class.
     */
    static schema(...extend) {
        return NumberComponent.schema({
            type: 'slider',
            label: 'Slider',
            key: 'slider',
        }, ...extend);
    }
    
    /**
     * This is the Form Builder information on how this component should show
     * up within the form builder. The "title" is the label that will be given
     * to the button to drag-and-drop on the buidler. The "icon" is the font awesome
     * icon that will show next to it, the "group" is the component group where
     * this component will show up, and the weight is the position within that
     * group where it will be shown. The "schema" field is used as the default
     * JSON schema of the component when it is dragged onto the form.
     */
    static get builderInfo() {
        return {
          title: 'Slider',
          icon: 'sliders',
          group: 'advanced',
          weight: 90,
          schema: Slider.schema()
        };
    }

    get inputInfo() {
        const info = super.inputInfo;
        info.attr.type = 'range';
        info.attr.value = this.component.defaultValue;
        info.attr.min = this.component.min;
        info.attr.max = this.component.max;
        info.attr.step = this.component.step;
        if (this.component.step === 0) {
            info.attr.step = 'any';
        }
        return info;
    }

    get defaultValue() {
        let defaultValue = super.defaultValue;
        if (defaultValue === undefined) {
            defaultValue = this.component.max < this.component.min
                ? this.component.min
                : this.component.min + (this.component.max - this.component.min) / 2;
        }
        return defaultValue;
    }
}
