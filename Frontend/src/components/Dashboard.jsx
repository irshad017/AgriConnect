import { faEnvelope, faHome, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    // State variables to store user information
    const [userName, setUserName] = useState('John Doe');
    const [balance, setBalance] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);

    const [farmerData,setFarmerData] = useState([])
    const [FarmerAllData,setFarmerAllData] = useState([])
    const [FarmerAllBlogs,setFarmerAllBlogs] = useState([])
    const [FarmerSellProducts,setFarmerSellProducts] = useState([])
    const [farmerName,setFarmerName] = useState("")
    const [farmerEmail,setFarmerEmail] = useState("")
    const [customersOrders,setCustomersOrders] = useState([])
    const [products, setProducts] = useState([])
    const [FarmAddress, setFarmAddress] = useState([])
    const [fetched,setFetched] = useState(true)
    const [selectOrderBool,setSelectOrderBool] = useState(false)
    const [AcceptBool,setAcceptBool] = useState(true)
    const [fetchFarm,setFetchFarm] = useState(true)
    const [ShowSelectData,setShowSelectData] = useState(true)
    const [OpenCustomer,setOpenCustomer] = useState([])
    const [selectedProductData,setSelectedProductData] = useState([])
    const [selectedBuyerData,setSelectedBuyerData] = useState([])
    const [ProTitle,setProTitle] = useState('')
    const [ProPrice,setProPrice] = useState('')
    const [ProQuantity,setProQuantity] = useState('')
    const [ProLocation,setProLocation] = useState('')
    const [UserAddress,setUserAddress] = useState('')
    const [FarmerID,setFarmerID] = useState('')
    const [BuyerID,setBuyerID] = useState('')


    useEffect(()=>{
        const fetch = async ()=>{
            try{
                const farmerID = localStorage.getItem('FarmerId')
                console.log("FarmerID: ",farmerID)
                if(farmerID){
                    const response = await axios.get(`http://localhost:5000/currentFarmerData?FarmerID=${farmerID}`)
                    if(response.status === 200){
                        const data = response.data.farmerData
                        setFarmerAllData(data)
                        // console.log("Data: ",data)
                        const SellProducT = data.productSell
                        setFarmerSellProducts(SellProducT)
                        // console.log(SellProducT)
                        const FarmADdress = data.farmLocation[0]
                        setFarmAddress(FarmADdress)
                        const ordeR = data.order
                        // console.log("Order: ",ordeR)
                        const responsePosts = await axios.get(`http://localhost:5000/currentFarmerDataPosts?FarmerID=${farmerID}`)
                        const PostS = responsePosts.data.Blog
                        setFarmerAllBlogs(PostS)
                        console.log("Blog: ",PostS)
                        if(data.length > 0){
                            setFarmerData(ordeR)
                        }
                        if(ordeR.length > 0){
                            setCustomersOrders(ordeR)
                            setFetched(false)
                        }
                        // const Name = response.data.farmerData.email.split('@')[0]
                        const Name = response.data.farmerData.firstName
                        const eMail = data.email
                        if(Name){
                            setFarmerName(Name)
                            setFarmerEmail(eMail)
                            setFarmerEmail(eMail)
                            setFetchFarm(false)

                        }
                    }
                }else{
                    console.log("FarmerId not present")
                }
            }catch(err){
                if(err.response && err.response.status === 300){
                    console.log("Farmer is not LOgged")
                }else{
                    console.log("ERROR",err)
                }
            }
        }
        fetch()
    },[AcceptBool])

    // const HandleOpen = async (BuyerId, order_id) => {
    //     console.log(BuyerId);
    //     setBuyerID(BuyerId)
    //     console.log("OrderId:", order_id);
    //     setFarmerID(order_id)
    //     const farmerID = localStorage.getItem('FarmerId')
    
    //     try {
    //         const response = await axios.get(`http://localhost:5000/currentUserDataOrder?farmerId=${farmerID}&orderId=${order_id}`);
            
    //         if (response.status === 200) {
    //             console.log("RES1: ", response.data.ProductData);
    //             // Update state with the fetched order data
    //             const data = response.data.ProductData
                
    //             setSelectedProductData(response.data.ProductData);
    //             // console.log("YEY",selectedProductData)
    //             const Title = data.title
    //             // console.log("Title: ",Title)
    //             // setProTitle(Title)
    //             // console.log(ProTitle)
    //         }
    //         const response2 = await axios.get(`http://localhost:5000/currentUserData?userId=${BuyerId}`);
            
    //         if (response2.status === 200) {
    //             console.log("RES2: ", response2.data.userData);
    //             // Update state with the fetched order data
    //             const Udata = response2.data.userData
    //             console.log("Udata: ",Udata)
    //             setSelectedBuyerData(Udata)
    //             setOpenCustomer(Udata)
    //             if(Udata){
    //                 setShowSelectData(false)
    //             }
    //             if (Udata.address && Udata.address.length > 0) {
    //                 const Uaddress = Udata.address[0];
    //                 console.log(Uaddress);
    //                 setUserAddress(Uaddress);
    //             } else {
    //                 console.log("No address found for this user");
    //                 setUserAddress(null); // Or handle accordingly
    //             }
    //             // console.log("YEY",Udata)
    //             // const Uaddress = Udata.farmLocation[0]
    //             // console.log(Uaddress)
    //             // setUserAddress(Uaddress)
    //             setSelectOrderBool(true)
    //         }
    //     } catch (err) {
    //         console.log("Error: ",err);
    //     }
    // };


    const event = []



    return (
        <div className="container mx-auto p-4">
        <header className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">Welcome {FarmerAllData.firstName}!</h1>
            
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
        <div className="p-6 space-y-4 bg-white shadow rounded max-w-md mx-auto">
            <h2 className="bg-gray-50 p-1 rounded shadow text-2xl font-semibold mb-2 flex items-center space-x-2">
                {/* <FontAwesomeIcon icon={faUser} className="text-blue-500" /> */}
                <span>Your Profile</span>
            </h2>
            <div className="bg-gray-50 p-4 rounded-md shadow">
                <div className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    <p className="text-gray-700 font-medium text-lg">Name: <span className="text-gray-500">{FarmerAllData.firstName} {FarmerAllData.lastName}</span></p>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                    <p className="text-gray-700 font-medium text-lg">Email: <span className="text-gray-500">{FarmerAllData.email}</span></p>
                </div>
                <div className="flex space-x-2">
                    <div className="flex items-center space-x-2 w-1/2">
                        <FontAwesomeIcon icon={faHome} className="text-gray-500" />
                        <p className="text-gray-700 font-medium text-lg">Farm Name: <span className="text-gray-500">{FarmerAllData.farmName}</span></p>
                    </div>
                    <div className="flex items-center space-x-2 w-1/2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
                        <p className="text-gray-700 font-medium text-lg">Farm Address: <span className="text-gray-500">{FarmAddress.pincode}, {FarmAddress.district}, {FarmAddress.state}</span></p>
                    </div>
                </div>
            </div>
            {/* <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Add Funds</button> */}
        </div>

            
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <ul className="bg-white shadow-md rounded-lg overflow-hidden max-w-full">
                <li className="hidden sm:flex justify-between py-3 px-4 bg-blue-100 text-blue-700 font-semibold border-b border-blue-200">
                    <span>Order ID</span>
                    <p>Title</p>
                    <span>Status</span>
                </li>
                {customersOrders.map(order => (
                    <li key={order._id} className="flex flex-col sm:flex-row justify-between py-3 px-4 bg-white hover:bg-blue-50 transition-all ease-in-out duration-300 border-b border-gray-200 space-y-2 sm:space-y-0">
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Order ID</span>
                            <span>#...{order._id.slice(19, 25)}</span>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Title</span>
                            <p className="truncate">{order.title}</p>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Status</span>
                            <span className={`font-semibold ${order.status === 'Accepted!' ? 'text-green-600' : 'text-red-600'}`}>{order.status}</span>
                        </div>
                        <span className="hidden sm:inline-block text-sm text-gray-700 font-medium">#...{order._id.slice(19, 25)}</span>
                        <p className="hidden sm:inline-block text-sm text-gray-600 font-medium truncate">{order.title}</p>
                        <span className={`hidden sm:inline-block text-sm font-semibold ${order.status === 'Accepted!' ? 'text-green-500' : 'text-red-400'}`}>{order.status}</span>
                    </li>
                ))}
            </ul>


            {/* <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View All Orders</button> */}
            </div>
        </div>

        {/* Additional Dashboard Features */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Favorites/Shortcuts */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">My Products</h2>
            <ul className="bg-white shadow-md rounded-lg overflow-hidden max-w-full">
                <li className="hidden sm:flex justify-between py-3 px-4 bg-blue-100 text-blue-700 font-semibold border-b border-blue-200">
                    <span>Product ID</span>
                    <p>Title</p>
                    <span>Date </span>
                </li>
                {FarmerSellProducts.map(order => (
                    <li key={order._id} className="flex flex-col sm:flex-row justify-between py-3 px-4 bg-white hover:bg-blue-50 transition-all ease-in-out duration-300 border-b border-gray-200 space-y-2 sm:space-y-0">
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Product ID</span>
                            <span>#...{order._id.slice(19, 25)}</span>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Title</span>
                            <p className="truncate">{order.title}</p>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Date</span>
                            <span className="font-semibold ">{order.productAddDate.slice(2,8)}</span>
                        </div>
                        <span className="hidden sm:inline-block text-sm text-gray-700 font-medium">#...{order._id.slice(19, 25)}</span>
                        <p className="hidden sm:inline-block text-sm text-gray-600 font-medium truncate">{order.title}</p>
                        <span className="hidden sm:inline-block text-sm font-semibold ">{order.productAddDate.slice(0,10)}</span>
                    </li>
                ))}
            </ul>


            {/* <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View All Orders</button> */}
            </div>

            
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">My Posts</h2>
            <ul className="bg-white shadow-md rounded-lg overflow-hidden max-w-full">
                <li className="hidden sm:flex justify-between py-3 px-4 bg-blue-100 text-blue-700 font-semibold border-b border-blue-200">
                    <span>Product ID</span>
                    <p>Title</p>
                    <span>Likes </span>
                </li>
                {FarmerAllBlogs.map(order => (
                    <li key={order._id} className="flex flex-col sm:flex-row justify-between py-3 px-4 bg-white hover:bg-blue-50 transition-all ease-in-out duration-300 border-b border-gray-200 space-y-2 sm:space-y-0">
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Product ID</span>
                            <span>#...{order._id.slice(19, 25)}</span>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Title</span>
                            <p className="truncate">{order.title.slice(0.10)}...</p>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Likes</span>
                            <span className="font-semibold ">{order.likes}</span>
                        </div>
                        <span className="hidden sm:inline-block text-sm text-gray-700 font-medium">#...{order._id.slice(19, 25)}</span>
                        <p className="hidden sm:inline-block text-sm text-gray-600 font-medium truncate">{order.title.slice(0,8)}...</p>
                        <span className="hidden sm:inline-block text-sm font-semibold ">{order.likes}</span>
                        {/* <span className="hidden sm:inline-block text-sm font-semibold ">{order.date.slice(0,10)}</span> */}
                    </li>
                ))}
            </ul>
            </div>

            {/* Calendar/Events */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <ul className="bg-white shadow-md rounded-lg overflow-hidden max-w-full">
                <li className="hidden sm:flex justify-between py-3 px-4 bg-blue-100 text-blue-700 font-semibold border-b border-blue-200">
                    <span>Event ID</span>
                    <p>Title</p>
                    <span>Date </span>
                </li>
                <p className='pl-2 pb-1'>No events scheduled</p>
                {event.map(order => (
                    <li key={order._id} className="flex flex-col sm:flex-row justify-between py-3 px-4 bg-white hover:bg-blue-50 transition-all ease-in-out duration-300 border-b border-gray-200 space-y-2 sm:space-y-0">
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Product ID</span>
                            <span>#...{order._id.slice(19, 25)}</span>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Title</span>
                            <p className="truncate">{order.title.slice(0.10)}...</p>
                        </div>
                        <div className="flex sm:hidden justify-between w-full text-blue-700 font-semibold">
                            <span>Likes</span>
                            <span className="font-semibold ">{order.likes}</span>
                        </div>
                        <span className="hidden sm:inline-block text-sm text-gray-700 font-medium">#...{order._id.slice(19, 25)}</span>
                        <p className="hidden sm:inline-block text-sm text-gray-600 font-medium truncate">{order.title.slice(0,8)}...</p>
                        <span className="hidden sm:inline-block text-sm font-semibold ">{order.likes}</span>
                        {/* <span className="hidden sm:inline-block text-sm font-semibold ">{order.date.slice(0,10)}</span> */}
                    </li>
                    ))}
            </ul>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
