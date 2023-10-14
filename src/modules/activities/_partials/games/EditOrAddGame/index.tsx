import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import swal from 'sweetalert';
import axios from 'axios';
import { getFormFromObject } from '@/utils/functions';
import { removeQuote } from '@/utils/format';
import Constants from '@/utils/constants';
import Modal from '@/components/Modal';
import UploadImage from '@/components/UploadImage';
import { getHeaders } from '@/utils/constants/config';
import Http from '@/utils/http';
import { GameInterface } from '@/interfaces/game.interface';

/* @params children as modal toggle*/
const CreateOrAddGame = ({
  removeMainGame,
  addGame,
  children,
  game,
  updateMainGame,
}: {
  removeMainGame?: undefined | (() => void);
  addGame?: undefined | ((a: GameInterface) => void);
  children: any;
  game?: GameInterface | null;
  updateMainGame?: Dispatch<SetStateAction<GameInterface | null>>;
}) => {
  const [toggleModalOnChange, setToggleModalOnChange] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [edit, setEdit] = useState(false);

  const createNewGameFields: any = {
    title: joi.string().required(),
    description: joi.string().required(),
  };
  if (game) {
    createNewGameFields.images = joi.array().items(joi.object());
  } else {
    createNewGameFields.images = joi.array().items(joi.object()).required();
  }
  const createGameSchema = joi.object(createNewGameFields);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(createGameSchema),
  });

  useEffect(() => {
    if (game) {
      setEdit(true);
      setValue('title', game.title);
      setValue('description', game.description);
    } else {
      setEdit(false);
    }
  }, [game]);
  useEffect(() => {
    setValue('images', [...files]);
  }, [files]);

  const editGame = (query: any) => {
    const formData: any = getFormFromObject({ ...query });
    axios
      .put(
        `${Constants.BACKEND_URL + Constants.endpoints.GAMES}/${game?._id}`,
        formData,
        getHeaders(),
      )
      .then(response => {
        const {
          data: { data },
        } = response;

        swal(
          'Game updated successful!',
          `${data?.title} is updated`,
          'success',
        ).then(() => {
          setToggleModalOnChange(i => !i);
        });
        if (updateMainGame) {
          updateMainGame({ ...data });
        }
      })
      .catch(error => {
        console.error(error);
        swal(
          'error!',
          error?.response?.data?.message ||
            'something went wrong, please try again later',
          'error',
        ).catch(err => console.error(err));
      });
  };
  const saveNewGame = (query: any) => {
    const formData: any = getFormFromObject({ ...query });
    axios
      .post(
        Constants.BACKEND_URL + Constants.endpoints.GAMES,
        formData,
        getHeaders(),
      )
      .then(response => {
        const {
          data: { data },
        } = response;

        swal(
          'Game created successful!',
          `${data?.title} is created`,
          'success',
        ).then(() => {
          setToggleModalOnChange(i => !i);
        });
        if (addGame) {
          addGame(data);
        }
      })
      .catch(error => {
        console.error(error);
        swal(
          'error!',
          error?.response?.data?.message ||
            'something went wrong, please try again later',
          'error',
        ).catch(err => console.error(err));
      });
  };
  const onSubmit = async (query: any) => {
    if (edit) {
      editGame(query);
    } else {
      saveNewGame(query);
    }
  };
  function deleteUser() {
    swal({
      title: ' Are you sure?',
      text: 'We are about to delete game, click "yes" if you are aware ',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(isConfirm => {
      if (isConfirm) {
        Http.axios
          .delete(`${Constants.endpoints.GAMES}/${game?._id}`)
          .then(response => {
            const {
              data: { data, message },
            } = response;
            swal({
              title: `${message}`,
              text: `Deleting ${data.title}  complete successfully !`,
              icon: 'success',
            }).then(() => {
              setToggleModalOnChange(i => !i);
              if (removeMainGame) {
                removeMainGame();
              }
            });
          })
          .catch(error => {
            console.error(error);
            swal(
              'Delete Fail',
              `Deleting ${game?.title}  fail, try agail later !`,
              'error',
            ).catch(err => console.error(err));
          });
      } else {
        swal('Cancelled', 'Your imaginary file is safe :)', 'error').catch(
          err => console.error(err),
        );
      }
    });
  }
  return (
    <Modal
      forceCloseOnChange={toggleModalOnChange}
      toggle={children}
      header={
        <div className="flex gap-5">
          {edit && (
            <button
              type="button"
              onClick={() => deleteUser()}
              className="material-icons text-red-700 rounded-2xl p-2 bg-red-300"
            >
              delete
            </button>
          )}
          <h3 className="text-3xl text-black font-semibold">
            {edit ? 'Edit' : 'Create'} game
          </h3>
        </div>
      }
    >
      <div className="flex items-center w-full py-4">
        <form
          onSubmit={event => {
            handleSubmit(onSubmit)(event);
          }}
          className="space-y-6 w-full"
          action="#"
        >
          <div className="w-full">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="newGameTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="title"
              {...register('title')}
            />
            {errors.title?.message && (
              <p className="mt-1 text-red-500">
                {removeQuote(`${errors.title.message}`)}
              </p>
            )}
          </div>
          <div className="w-full">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Description
            </label>
            <textarea
              {...register('description')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.description?.message && (
              <p className="mt-1 text-red-500">
                {removeQuote(`${errors.description.message}`)}
              </p>
            )}
          </div>
          <div className="w-full text-black flex flex-col gap-2">
            {game && (
              <div className="flex flex-col gap-1">
                <span className="mb-3">previous selected images</span>
                {game.images?.map((each: string) => (
                  <a
                    className="text-brand-bold underline"
                    key={`${each}makeItUNIQUE3`}
                    href={each}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {each}
                  </a>
                ))}
              </div>
            )}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Images
            </label>
            <UploadImage
              initialFiles={[...files]}
              updateFilesCb={setFiles}
              multiple
            />
            {errors.images?.message && (
              <p className="mt-1 text-red-500">
                {removeQuote(`${errors.images.message}`)}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#4E00CE] hover:bg-[#5E00CE] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            {edit ? 'Edit' : 'Create'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

CreateOrAddGame.defaultProps = {
  removeMainGame: undefined,
  addGame: undefined,
  game: null,
  updateMainGame: undefined,
};
export default CreateOrAddGame;
