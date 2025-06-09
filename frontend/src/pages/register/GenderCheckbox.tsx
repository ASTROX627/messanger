import { useEffect, type FC, type JSX } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterFormValue } from "./Register";
import toast from "react-hot-toast";


const GenderCheckbox: FC = (): JSX.Element => {

  const { register, formState: { errors } } = useFormContext<RegisterFormValue>();

  useEffect(() => {
    if(errors.gender?.message){
      toast.error(errors.gender.message)
    }
  }, [errors.gender])

  return (
    <>
      <div className="flex mt-4 gap-3">
        <div className="flex flex-col">
          <label className="label gap-2 cursor-pointer">
            <span>Male</span>
            <input
              {...register("gender")}
              type="radio"
              value="male"
              className="radio"
            />
          </label>
        </div>
        <div className="flex flex-col">
          <label className="label gap-2 cursor-pointer">
            <span>Female</span>
            <input
              {...register("gender")}
              type="radio"
              value="female"
              className="radio"
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default GenderCheckbox
