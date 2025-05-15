import { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Label } from './label';



interface InputClassInterface {
    input?: string;
    root?: string;
}

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form?: any;
    isSubmitting?: boolean;
    label?: string;
    name?: string;
    placeholder?: string;
    description?: string;
    type?: string;
    required?: boolean;
    classNames?: InputClassInterface;
    className?: string;
    StartIcon?: LucideIcon;
    readOnly?: boolean;
    fullWidth?: boolean;
    rows?: number;
}

const CustomInput = ({ form, isSubmitting = false, label, name = '', placeholder, description, type = 'text', required = false, classNames = { input: '', root: '' }, className = '', readOnly = false, fullWidth = true, value, onChange = () => { }, ...props }: CustomInputProps) =>
    form ? (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={`${fullWidth ? 'w-full' : 'max-w-sm'} ${classNames.root}`}>
                    {label && (
                        <FormLabel>
                            {label}
                            {required && <sup className='text-sm text-red-500'>*</sup>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className='relative'>
                            <Input type={type} className={`focus-visible:ring-0 ${readOnly && 'cursor-not-allowed bg-gray-100 dark:bg-gray-800'} ${classNames.input} ${className} `} disabled={isSubmitting || props.disabled} placeholder={placeholder} readOnly={readOnly} {...field} />
                        </div>
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    ) : (
        <div className={`flex ${fullWidth ? 'w-full' : 'max-w-sm'} flex-col`}>
            {label && <Label className='mb-2'>{label}</Label>}
            <div className='relative'>
                <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder || ''} className={`  ${classNames.input}`} {...props} />
            </div>
        </div>
    );

export default CustomInput;