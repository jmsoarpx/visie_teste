import React, { memo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IProdutos, ProdutosServices } from "../../shared/services/api";
import { toast } from "react-toastify";
import { Toast } from "../../shared/components/toast";
import Swal from "sweetalert2";

import "./_view-product.scss";
import { Button } from "../../shared/components/button/button";
import "sweetalert2/src/sweetalert2.scss";

type FormValues = IProdutos;

const ViewProduct: React.FC = () => {
   const { id, opcao } = useParams();
   const navigate = useNavigate();
   const [product, setProduct] = useState<IProdutos | null>();
   const [imageURLs, setImageURLs] = useState<string[]>([]);
   const [images, setImages] = useState<string[]>([]);
   const [imageThumbnail, setImageThumbnail] = useState<string | any>();
   const [disabled, setDisabled] = useState<boolean>(opcao === "visualizar" ? true : false);
   const [textButton, setTextButton] = useState<string>(opcao === "visualizar" ? "Voltar" : "Cancelar");

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormValues>();

   const onSubmit = (data: FormValues, e: React.BaseSyntheticEvent) => {
      if (opcao === "adiconar") {
         delete data.id;
         data.images = imageURLs;
         data.thumbnail = imageThumbnail;

         ProdutosServices.create(data).then((result) => {
            if (result instanceof Error) {
               toast.error(result.message, {
                  position: "top-right",
                  closeOnClick: true,
                  pauseOnHover: true,
               });
               return;
            } else {
               Swal.fire({
                  title: "Incluido produto com sucesso",
                  icon: "success",
               });
            }
         });
      } else {
         delete data.id;
         data.images = imageURLs;
         data.thumbnail = imageThumbnail;

         ProdutosServices.updateByID(id as unknown as number, data).then((result) => {
            if (result instanceof Error) {
               toast.error(result.message, {
                  position: "top-right",
                  closeOnClick: true,
                  pauseOnHover: true,
               });
               return;
            } else {
               Swal.fire({
                  title: "Produtor Atualizado",
                  icon: "success",
               });
            }
         });
      }
   };

   useEffect(() => {
      if (opcao !== "adiconar") {
         ProdutosServices.getByID(Number(id)).then((result) => {
            if (result instanceof Error) {
               toast.error(result.message, {
                  position: "top-right",
                  closeOnClick: true,
                  pauseOnHover: true,
               });
               return;
            } else {
               setProduct(result);
               reset(result);
               setImages(result.images);
               setImageThumbnail(result.thumbnail);
            }
         });
      }
   }, []);

   useEffect(() => {
      if (images.length < 1) return;
      setImageURLs(images);
   }, [images, imageURLs]);

   const changeImage = (index: number, event: any) => {
      const newArrayImage = images;
      newArrayImage[index] = URL.createObjectURL(event.target.files[0]);
      setImageURLs([]);
      setImages(newArrayImage);
   };

   const insertThumbnailImage = (event: any) => {
      setImageThumbnail(URL.createObjectURL(event.target.files[0]));
   };

   const handleChange = (e: any) => {
      e.preventDefault();
      setDisabled(!disabled);
      setTextButton(!disabled ? "Voltar" : "Cancelar");
   };

   const handleDeleteProduct = (id: number) => {
      Swal.fire({
         text: "Tem certeza que deseja excluir o produto?",
         title: "Exclusão de produto",
         icon: "question",
         iconColor: "red",
         timer: 10000,
         timerProgressBar: true,
         showDenyButton: true,
         denyButtonColor: "green",
         confirmButtonColor: "red",
         denyButtonText: "Não",
         confirmButtonText: "Sim",
         showCloseButton: true,
         preConfirm: () => {
            ProdutosServices.deleteByID(id).then((result) => {
               if (result instanceof Error) {
                  toast.error(result.message, {
                     position: "top-right",
                     closeOnClick: true,
                     pauseOnHover: true,
                  });
                  return;
               } else {
                  Swal.fire({
                     title: "Produtor deletado",
                     icon: "success",
                  });
               }
            });
         },
      });
   };

   const insertImages = (event: any) => {
      const newArrayImages = Object.values(event.target.files)?.map((file: any) => URL.createObjectURL(file));
      setImageURLs([]);
      setImages(newArrayImages);
   };

   const handleRemoveImage = (index: number) => {
      const newArrayImage = images;
      delete newArrayImage[index];
      setImageURLs([]);
      setImages(newArrayImage);
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="form_row">
               <div className="form__column">
                  {imageThumbnail && (
                     <figure className="form__figure">
                        <img src={imageThumbnail} className="form__img" alt="Elephant at sunset" width={150} height={100} title="Logo do CSS" />
                        <figcaption className="form__figcaption">Imagem thumbnail</figcaption>
                     </figure>
                  )}
                  {!disabled && (
                     <>
                        <input type="file" name="thumbnail" accept="image/*" id="thumbnail" onChange={insertThumbnailImage} className="form__input-file" />
                        <label htmlFor="thumbnail" className="form__input-label">
                           <span>Selecionar imagem para thumbnail</span>
                        </label>
                     </>
                  )}
               </div>
            </div>

            <div className="form__row">
               {imageURLs.map((imageSrc, index) => (
                  <div className="form__column">
                     <figure className="form__figure">
                        <img src={imageSrc} key={imageSrc} height={100} width={150} />
                        <figcaption className="form__figcaption">{`Imagem ${index}`}</figcaption>
                        {!disabled && (
                           <>
                              <input
                                 key={index}
                                 type="file"
                                 name={imageSrc}
                                 accept="image/*"
                                 onChange={(event) => changeImage(index, event)}
                                 id={imageSrc}
                                 className="form__input-file"
                              />
                              <label htmlFor={imageSrc} className="form__input-label">
                                 <span>{`Alterar Imagem ${index}`}</span>
                              </label>
                              <Button texto="Remover" className="primary" onClick={() => handleRemoveImage(index)} />
                           </>
                        )}
                     </figure>
                  </div>
               ))}
            </div>
            {!disabled && (
               <div className="form__row">
                  <input type="file" name="images" accept="image/*" multiple id="images" onChange={insertImages} className="form__input-file" />
                  <label htmlFor="images" className="form__input-label">
                     <span>Selecionar arquivo para Imagens</span>
                  </label>
               </div>
            )}

            <div className="form__row">
               <div className="form__column">
                  <input {...register("id")} type="number" className="form__input" id="id" disabled />
                  <div className="form__cut"></div>
                  <label htmlFor="id" className="form_label">
                     ID
                  </label>
               </div>
               <div className="form__column flex__column">
                  <input {...register("title", { required: true })} className="form__input" id="title" disabled={disabled} />
                  <div className="form__cut"></div>
                  <label htmlFor="title" className="form_label">
                     Titulo
                  </label>
                  {errors.title && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
               <div className="form__column">
                  <input
                     {...register("price", { required: true })}
                     type="number"
                     className="form__input"
                     id="price"
                     disabled={disabled}
                     pattern="[0-9]+([,\.][0-9]+)?"
                     min="0"
                     step="0.01"
                  />
                  <div className="form__cut"></div>
                  <label htmlFor="price" className="form_label">
                     Preço
                  </label>
                  {errors.price && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
            </div>
            <div className="form__row">
               <div className="form__column">
                  <input
                     {...register("discountPercentage", { required: true })}
                     type="number"
                     className="form__input"
                     id="discountPercentage"
                     disabled={disabled}
                     pattern="[0-9]+([,\.][0-9]+)?"
                     min="0"
                     step="0.01"
                  />
                  <div className="form__cut form__cut-log"></div>
                  <label htmlFor="discountPercentage" className="form_label">
                     Percentual de desconto
                  </label>
                  {errors.discountPercentage && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
               <div className="form__column">
                  <input
                     {...register("rating", { required: true })}
                     type="number"
                     className="form__input"
                     id="rating"
                     disabled={disabled}
                     pattern="[0-9]+([,\.][0-9]+)?"
                     min="0"
                     step="0.01"
                  />
                  <div className="form__cut"></div>
                  <label htmlFor="rating" className="form_label">
                     Avaliação
                  </label>
                  {errors.rating && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
               <div className="form__column ">
                  <input {...register("stock", { required: true })} className="form__input" id="stock" disabled={disabled} />
                  <div className="form__cut form__cut-log"></div>
                  <label htmlFor="stock" className="form_label">
                     Qtd em Estoque
                  </label>
                  {errors.stock && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
               <div className="form__column">
                  <input {...register("brand", { required: true })} type="text" className="form__input" id="brand" disabled={disabled} />
                  <div className="form__cut"></div>
                  <label htmlFor="brand" className="form_label">
                     Marca
                  </label>
                  {errors.brand && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
            </div>
            <div className="form__row">
               <div className="form__column">
                  <input {...register("category", { required: true })} type="text" className="form__input" id="category" disabled={disabled} />
                  <div className="form__cut"></div>
                  <label htmlFor="category" className="form_label">
                     Categoria
                  </label>
                  {errors.category && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
            </div>
            <div className="form__row">
               <div className="form__column">
                  <textarea {...register("description", { required: true })} className="form__textarea" id="description" disabled={disabled} />
                  <div className="form__cut"></div>
                  <label htmlFor="description" className="form_label">
                     Descrição
                  </label>
                  {errors.description && <p className="form_error">Esse campo é Obrigatorio</p>}
               </div>
            </div>
            <div className="form__buttons">
               <Button type="button" className="warning" texto={textButton} onClick={() => navigate("/lista-produtos")} />
               {opcao === "visualizar" && <Button type="button" className="info" onClick={handleChange} texto="Alterar" />}
               {disabled && <Button type="button" className="primary" texto="Excluir" onClick={() => handleDeleteProduct(id as unknown as number)} />}
               {!disabled && <Button type="submit" className="secondary" texto="submit" />}
            </div>
         </form>
         <Toast />
      </>
   );
};

export default memo(ViewProduct);
