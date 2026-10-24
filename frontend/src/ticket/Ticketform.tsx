import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import React, { useEffect, useState } from "react"
import { getAllCategory } from "../store/categorySlice"
import { FileText, Send } from "lucide-react"
import { getSingleTicket } from "../store/ticketSlice"
import { useParams } from "react-router-dom"

interface ticketProps{
    name : string
    onEvent : (data :FormData)=> void
}

const Ticketform:React.FC<ticketProps> = ({name , onEvent}) => {

    const {id} = useParams()

    const classInput = "bg-gray-50 border border-gray-200 text-sm w-full px-4 py-3 rounded-md outline-none transition-all duration-200 focus:ring-1 focus:bg-white focus:border-blue-500 focus:ring-blue-100"
    const optionDiv = "w-1/3 border border-gray-200 shadow rounded-lg px-3 py-2 cursor-pointer transition-all mb-[3vh]"

    const [data, setData] = useState({
    title: "",
    cId: "",
    priority: "medium",
    description: ""
});

const [image, setImage] = useState<File | null>(null);
 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name , value } = e.target

        setData((data)=>({...data , 
            [name] : value
        }))
    }

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append('title' , data.title)
            formData.append('cId' , data.cId)
            formData.append('priority' , data.priority)
            formData.append('description' , data.description)

            if(image){
                formData.append('image' , image)
            }

            onEvent(formData)
            
        } catch (error) {
             console.error("Ticket submission failed:", error);
        }

    }

    const dispatch = useDispatch<AppDispatch>()
    const { category } = useSelector((state: RootState) => state.categroy)
    const { ticket } = useSelector((state: RootState) => state.ticket)

    useEffect(() => {
        dispatch(getAllCategory())
        if (id) {
        dispatch(getSingleTicket(Number(id)));
    } else {
        setData({
            title: "",
            cId: "",
            priority: "medium",
            description: ""
        });
        setImage(null);
    }
    }, [dispatch , id])

    useEffect(() => {
    if (id && ticket) {
        setData({
            title: ticket.title ?? "",
            cId: String(ticket.cId ?? ""),
            priority: ticket.priority ?? "medium",
            description: ticket.description ?? ""
        });
    }
}, [id, ticket]);


    return (
        <div className="px-5 py-8 bg-[#FAF8FF] flex flex-col gap-10 justify-center items-center">

            <div className="w-[95%] py-5 bg-white shadow rounded-2xl flex flex-col justify-center items-start px-10 gap-1">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-blue-600">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    IT SERVICE DESK
                </span>
                <h1 className="font-medium text-4xl">{name} a support ticket</h1>
                <span className="text-[14px] font-normal">Tell us what's happening out IT team wiil investigate and resolve it promptly</span>
            </div>

            <div className="w-[95%] bg-white shadow rounded-2xl py-5 px-10 flex flex-col gap-5">
                <div className="flex gap-3 mb-3">
                    <div className="scale-150 text-blue-600 bg-blue-50 p-2 rounded-lg">
                        <FileText size={20} />
                    </div>
                    <h1 className="text-2xl ml-2 font-medium">Problem Details</h1>
                </div>
                <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-col justify-center items-start gap-2">
                        <label htmlFor="ticket-subject" className="text-sm font-medium text-gray-700">Ticket Subject</label>
                        <input
                            id="ticket-subject"
                            type="text"
                            className={classInput}
                            placeholder="Title of Problem"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-between items-center gap-3">
                        <div className="flex flex-col justify-center items-start gap-2 w-1/2">
                            <label htmlFor="ticket-subject" className="text-sm font-medium text-gray-700">Category</label>
                            <select name="category" value={data.cId}  id="" className={classInput} onChange={handleChange} >
                                <option value="">Select an Option</option>
                                {
                                    category.map((category) => (
                                        <option key={category.id} value={category.id}>{category.cName}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="flex flex-col justify-center items-start gap-2 w-1/2">
                            <label htmlFor="ticket-subject" className="text-sm font-medium text-gray-700">Attach Files</label>
                            <input
                                type="file"
                                className={classInput}
                                name="image"
                                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-700">Impact Severity Level</p>

                        <div className="flex justify-between items-center gap-7">
                            <div className={`${optionDiv} ${data.priority === "low"
                                ? "ring-2 ring-blue-500 scale-105"
                                : ""
                                }`}>
                                <div className="flex justify-between items-center mb-[2vh]">
                                    <label className="bg-green-100 text-green-500 text-[12px] p-1 font-medium rounded-lg" >Low</label>
                                    <input type="radio" name="priority" value="low"
                                        checked={data.priority === "low"}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-blue-600 cursor-pointer"
                                    />
                                </div>

                                <p className="font-semibold">Low Priority</p>
                                <p className="text-gray-700 text-[12px]">Minor issue with minimal impact.</p>
                            </div>

                            <div className={`${optionDiv} ${data.priority === "medium"
                                ? "ring-2 ring-blue-500 scale-105"
                                : ""
                                }`}>
                                <div className="flex justify-between items-center mb-[2vh]">
                                    <label className="bg-yellow-100 text-orange-500 text-[12px] p-1 font-medium rounded-lg" >Medium</label>
                                    <input type="radio" name="priority" value="medium"
                                        checked={data.priority === "medium"}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-blue-600 cursor-pointer"
                                    />
                                </div>
                                <p className="font-semibold">Medium Priority</p>
                                <p className="text-gray-700 text-[12px]">Reduced performance or partial disruption.</p>
                            </div>

                            <div className={`${optionDiv} ${data.priority === "high"
                                ? "ring-2 ring-blue-500 scale-105"
                                : ""
                                }`}>
                                <div className="flex justify-between items-center mb-[2vh]">
                                    <label className="bg-red-100 text-red-500 text-[12px] p-1 font-medium rounded-lg" >High</label>
                                    <input type="radio" name="priority" value="high"
                                        checked={data.priority === "high"}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-blue-600 cursor-pointer"
                                    />
                                </div>
                                <p className="font-semibold">High Priority</p>
                                <p className="text-gray-700 text-[12px]">Critical issue affecting essential work.</p>
                            </div>


                        </div>
                        <div className="mt-[3vh]">
                            <p className="mb-2 text-sm font-medium text-gray-700">Description</p>
                            <textarea name="description" id="" className={classInput} value={data.description} rows={5} placeholder="Describe your problem in details.." onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                        <p className="text-xs text-gray-400">
                            <span className="text-red-500">*</span> Required fields
                        </p>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                        >
                            {name === "Edit" ? "Edit Ticket" : "Submit Ticket"}
                            <Send size={16} />
                        </button>
                    </div>


                </form>
            </div>

        </div>
    )
}

export default Ticketform