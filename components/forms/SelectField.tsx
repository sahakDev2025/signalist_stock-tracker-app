import { Controller } from "react-hook-form"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const SelectField = ({ name, label, placeholder, options, control, error, required = false }: SelectFieldProps) => {
    return (
        <div className="space-y-2">
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select a ${label.toLowerCase()}` : false,
                }}

                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <label htmlFor={name}> {label} </label>
                        <SelectTrigger className="select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 text-white">
                            {
                                options.map((option)=>(
                                    <SelectItem key={option.value} value={option.value} className="focus:bg-gray-600 focus:text-white">
                                        {option.label}
                                    
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                        {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
                    </Select>
                )}
            />

        </div>
    )
}

export default SelectField