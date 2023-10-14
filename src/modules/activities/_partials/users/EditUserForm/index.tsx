import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import { removeQuote } from '@/utils/format';

const EditUserForm = ({
  onSubmit,
  user,
  actionName,
  isProfile,
}: {
  actionName?: string;
  onSubmit: any;
  isProfile?: boolean;
  user?: UserProfileInterface | null;
}) => {
  const createNewUserFields: any = {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    referralCode: joi.string(),
  };
  if (!user) {
    createNewUserFields.password = joi.string().required();
  }
  if (!isProfile) {
    createNewUserFields.email = joi.string().required();
  }

  const createUserSchema = joi.object(createNewUserFields);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(createUserSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('phoneNumber', user.phoneNumber);
      setValue('referralCode', user.referralCode);
      if (!isProfile) {
        setValue('email', user.email);
      }
    }
  }, [user]);

  return (
    <form
      onSubmit={event => {
        handleSubmit(onSubmit)(event);
      }}
      className="space-y-6 w-full"
      action="#"
    >
      <div className="w-full">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name
        </label>
        <input
          type="text"
          id="firstNameId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="First Name"
          {...register('firstName')}
        />
        {errors.firstName?.message && (
          <p className="mt-1 text-red-500">
            {removeQuote(`${errors.firstName.message}`)}
          </p>
        )}
      </div>
      <div className="w-full">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name
        </label>
        <input
          type="text"
          id="lastNameId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Last name"
          {...register('lastName')}
        />
        {errors.lastName?.message && (
          <p className="mt-1 text-red-500">
            {removeQuote(`${errors.lastName.message}`)}
          </p>
        )}
      </div>
      <div className="w-full">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumberId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Phone Number"
          {...register('phoneNumber')}
        />
        {errors.phoneNumber?.message && (
          <p className="mt-1 text-red-500">
            {removeQuote(`${errors.phoneNumber.message}`)}
          </p>
        )}
      </div>
      {isProfile ? null : (
        <div className="w-full">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="emailId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="email"
            {...register('email')}
          />
          {errors.email?.message && (
            <p className="mt-1 text-red-500">
              {removeQuote(`${errors.email.message}`)}
            </p>
          )}
        </div>
      )}
      {user ? null : (
        <div className="w-full">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="passwordId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password?.message && (
            <p className="mt-1 text-red-500">
              {removeQuote(`${errors.password.message}`)}
            </p>
          )}
        </div>
      )}
      <div className="w-full">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          referral Code (Optional)
        </label>
        <input
          disabled={!!user}
          type="text"
          id="referralCode"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Referral Code"
          {...register('referralCode')}
        />
        {errors.referralCode?.message && (
          <p className="mt-1 text-red-500">
            {removeQuote(`${errors.referralCode.message}`)}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full text-white bg-[#4E00CE] hover:bg-[#5E00CE] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        {actionName}
      </button>
    </form>
  );
};

EditUserForm.defaultProps = {
  user: undefined,
  actionName: 'Edit',
  isProfile: false,
};
export default EditUserForm;
