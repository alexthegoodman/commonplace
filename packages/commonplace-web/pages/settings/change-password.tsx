import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput/FormInput";
import FormMessage from "../../components/FormMessage/FormMessage";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";

const Settings: NextPage = () => {
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (results) => console.info(results);
  const onError = (error) => console.error(error);

  return (
    <section className="settings">
      <div className="settingsInner">
        <PrimaryHeader
          inline={true}
          leftIcon={
            <Link href="/settings">
              <a>
                {/* <div className="feather-icon icon-arrow-left"></div> */}
                <i className="typcn typcn-arrow-left"></i>
              </a>
            </Link>
          }
          title="Change Password"
          rightIcon={<></>}
        />
        <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <FormMessage type="error" message={formErrorMessage} />

          <FormInput
            type="password"
            name="newPassword"
            placeholder="New Password"
            register={register}
            errors={errors}
            validation={{ required: "New Password is required." }}
          />

          <FormInput
            type="password"
            name="confirmPassowrd"
            placeholder="Confirm Password"
            register={register}
            errors={errors}
            validation={{ required: "Confirm Password is required." }}
          />

          <input className="circleButton" type="submit" value="SAVE" />
        </form>
      </div>
    </section>
  );
};

export default Settings;
