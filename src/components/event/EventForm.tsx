import {useNavigate, useParams} from "react-router-dom";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../input/Input";
import {imageFileValidation, minValueValidation, requiredValidation} from "../../utils/validationUtils";
import React, {useEffect, useState} from "react";
import {Event, NewEvent} from "../../types/eventTypes";
import {User} from "../../types/usersTypes";
import EventService from "../../API/EventService";
import {convertToInt} from "../../utils/functions";
import { Address } from "../../types/addressTypes";

const EventForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const storedUserString = localStorage.getItem("currentUser");
    const currentUser: User = storedUserString ? JSON.parse(storedUserString) : null;
    const [event, setEvent] = useState<Event>();
    const [isAddressDisabled, setIsAddressDisabled] = useState(false); // State for checkbox

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            caption: '',
            price: 0.0,
            capacity: 0,
            description: '',
            city: '',
            country: '',
            address: '',
            file: File,
            online: false,
            dateTime: ''
        },
    });
    useEffect(()=>{
        if(id) {
            EventService.getEventById(convertToInt(id))
                .then((data)=>{
                    setEvent(data);
                })
                .catch(() => {
                    toast.error('Failed to edit event.');
                    navigate('/events')
                })
        }
    }, []);
    useEffect(()=>{
        if (event) {
            setValue('caption', event.caption);
            setValue('description', event.description);
            setValue('price', event.price);
            setValue('address', event.address.address);
            setValue('city', event.address.city);
            setValue('country', event.address.country);
            setValue('capacity', event.capacity);
            setValue('online', event.online);
            setValue('dateTime', event.dateTime);
            if(event.online)
                setIsAddressDisabled(true);
        }
    }, [event]);
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(currentUser){
            const organiser: User={
                id: currentUser.id,
                username: currentUser.username,
                password: currentUser.password,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                email: currentUser.email,
                profileImageUrl: currentUser.profileImageUrl
            }
            const addressData: Address = {
                city: data.city,
                country: data.country,
                address: data.address
            }
            const eventData: NewEvent = {
                caption: data.caption,
                dateTime: data.dateTime,
                price: data.price,
                capacity: data.capacity>0 ? data.capacity : undefined,
                online: data.online,
                address: addressData,
                description:data.description,
                participants:[],
                reviews:[],
                organiser: organiser
            };

            if(id && event){
                EventService.editEvent(eventData,convertToInt(id), data.file[0])
                    .then((data) => {
                            toast.success("Successful edited event")
                            reset();
                            console.log("Success");
                        navigate(`/events`);
                        }
                    )
                    .catch((error) => {
                        toast.error("Failed to edit event")
                        console.error('Error in editing event:', error);
                    });
            }else{
                EventService.createEvent(eventData, data.file[0])
                    .then((data) => {
                            toast.success("Successful created event")
                            reset();
                            navigate(`/events`);
                        }
                    )
                    .catch((error) => {
                        toast.error("Failed to create event")
                        console.error('Error in creating event:', error);
                    });
            }


        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div className="col-md-9">
                <Input
                    id="caption"
                    label="Caption"
                    placeholder="Caption"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                    }}
                    required
                />
            </div>
            <div className="form-check form-switch col-md-2 ms-4 pt-3">
                <input
                    className="form-check-input pt-2"
                    type="checkbox"
                    id="online"
                    {...register("online")}
                    onChange={(e) => setIsAddressDisabled(e.target.checked)}
                />
                <label className="form-check-label fs-5 pb-3" htmlFor="online">Online</label>
            </div>
            <div className="col-md-12">
                <Input
                    id="dateTime"
                    label="Date Time"
                    type="datetime-local"
                    placeholder="Date Time"
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                    }}
                    required
                />
            </div>
            <div className="col-md-6">
                <Input
                    id="country"
                    label="Country"
                    placeholder="Country"
                    register={register}
                    errors={errors}
                    validationOptions={!isAddressDisabled ? {
                        ...requiredValidation,
                    }: {}}
                    required={!isAddressDisabled}
                    disabled={isAddressDisabled}
                />
            </div>
            <div className="col-md-6">
                <Input
                    id="city"
                    label="City"
                    placeholder="City"
                    register={register}
                    errors={errors}
                    validationOptions={!isAddressDisabled ? {
                        ...requiredValidation,
                    }: {}}
                    required={!isAddressDisabled}
                    disabled={isAddressDisabled}
                />
            </div>
            <div className="col-md-12">
                <Input
                    id="address"
                    label="Address"
                    placeholder="Address"
                    register={register}
                    errors={errors}
                    validationOptions={!isAddressDisabled ? {
                        ...requiredValidation,
                    }: {}}
                    required={!isAddressDisabled}
                    disabled={isAddressDisabled}
                />
            </div>
            <div className="col-md-6">
                <Input
                    id="price"
                    label="Price"
                    placeholder="Price"
                    type='number'
                    register={register}
                    errors={errors}
                    validationOptions={{
                        ...requiredValidation,
                        ...minValueValidation(0),
                    }}
                    required
                />
            </div>
            <div className="col-md-6">
                <Input
                    id="capacity"
                    label="Capacity"
                    type='number'
                    placeholder="Capacity"
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="col-md-12">
                <Input
                    id="description"
                    label="Description"
                    placeholder="Description"
                    register={register}
                    errors={errors}
                    isTextArea={true}
                />
            </div>
            {event && id ?
                <>
                <div className="col-md-3">
                    <img src={event?.imageUrl} alt={event?.caption} style={{ maxHeight: '170px', objectFit: 'cover' }} />
                </div>
                <div className="col-md-9">
                    <Input
                        id={'file'}
                        label={'Choose new image'}
                        placeholder={'Choose new image'}
                        type={'file'}
                        register={register}
                        errors={errors}
                        validationOptions={{
                            ...imageFileValidation}}
                    ></Input>
                </div>
                </> :
                <div className="col-md-12">
                    <Input
                        id={'file'}
                        label={'File'}
                        placeholder={'File'}
                        type={'file'}
                        register={register}
                        errors={errors}
                        validationOptions={{
                            ...imageFileValidation}}
                    ></Input>
                </div>
            }

            <div className="col-12">
                <button type="submit" className="btn btn-primary">{event && id ? "Save changes" : "Organise"}</button>
            </div>
        </form>
    );
}
export default EventForm;