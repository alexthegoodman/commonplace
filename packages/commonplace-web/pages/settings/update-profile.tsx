import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../components/FormInput/FormInput";
import FormMessage from "../../components/FormMessage/FormMessage";
import FormUpload from "../../components/FormUpload/FormUpload";
import PrimaryHeader from "../../components/PrimaryHeader/PrimaryHeader";

const Settings: NextPage = () => {
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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
          title="Update Profile"
          rightIcon={<></>}
        />
        <FormProvider {...methods}>
          <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <FormMessage type="error" message={formErrorMessage} />

            <FormInput
              type="text"
              name="username"
              placeholder="Username"
              register={register}
              errors={errors}
              validation={{ required: "Username is required." }}
            />

            <FormUpload
              name="profileImage"
              placeholder="Profile Image"
              register={register}
              errors={errors}
              validation={{
                required: false,
              }}
            />

            <FormUpload
              name="coverImage"
              placeholder="Cover Image"
              register={register}
              errors={errors}
              validation={{
                required: false,
              }}
            />

            <input className="circleButton" type="submit" value="SAVE" />
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Settings;
