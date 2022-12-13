import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate';
import {
    required, max, alpha_spaces as alphaSpaces, email,
    min_value as minVal, max_value as maxVal, confirmed
} from '@vee-validate/rules';

export default {
    install(app) {
        app.component('VeeForm', VeeForm)
        app.component('VeeField', VeeField)
        app.component('ErrorMessage', ErrorMessage )

        defineRule('required', required)
        defineRule('tos', required)
        defineRule('max', max)
        defineRule('alphaSpaces', alphaSpaces)
        defineRule('email', email)
        defineRule('min_value', minVal)
        defineRule('max_value', maxVal)
        defineRule('confirmed', confirmed)

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    min: `The field ${ctx.field} is too short.`,
                    max: `The field ${ctx.field} is too long.`,
                    alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
                    email: `The field ${ctx.field} must be a valid email.`,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too high.`,
                    confirmed: `The passwords don't match.`,
                    tos: 'You must accept the Terms of service.'
                }

                const message = messages[ctx.rule.name] || `The field ${ctx.field} is invalid`

                return message
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true
        })
    }
}