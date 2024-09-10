import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {toast, Toaster} from 'react-hot-toast'
import {v4 as uuidv4} from 'uuid'



const isValidURL = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch (_) {
        return false;
    }
};

function Marketplace() {
    const [products, setProducts] = useState([])
    const [farmerData, setFarmerData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [fetched,setFetched] = useState(true)
    const [BuyerID,setBuyerID] = useState("")
    const [UserOrder,setUserOrder] = useState("")
    const [pre,setPre] = useState([
        // {
        //     imageURL: "https://source.unsplash.com/random?fruit",
        //     title: "Tomato",
        //     description: "Red-Tomatoes",
        //     rate: "5",
        //     quantity: "1"
        // }
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/market_product')
                const products = response.data?.data
                const farms = response.data?.farmerData
                if (!products) {
                    console.log("Error in fetching or invalid data structure");
                    return;
                }
                if (!farms) {
                    console.log("Error in fetching or invalid data structure");
                    return;
                }
                // console.log("Fetched Data:", products);
                // console.log("Farmer Data:", farms);
                // console.log("Products Data:", item.data.data);
                if (products.length > 0) {
                    setProducts(products); // Pass the correct array to setProducts
                    setFetched(false); // Update fetched state
                } else {
                    console.log('No products found');
                }
                if(farms.length > 0){
                    setFarmerData(farms)
                }else{
                    console.log('No Farmers found');
                }
            } catch (err) {
                console.log("Error in fetching",err)
            }
        }
        fetchData()
        console.log(selectedProduct)
    }, [])

    const handleRequestToBuy = (product) => {
        setSelectedProduct(product)
        console.log("Product:",product)
        setShowModal(true)
        
    }
    
    // console.log("Slele",selectedProduct)
    const handleConfirmPurchase = async () => {
        const UserID = localStorage.getItem('UserId')
        const FarmerID = localStorage.getItem('FarmerId')
        const Token = localStorage.getItem('token')
        
        if(FarmerID){
            toast.error(`To place an order, please log in as a User. You are currently logged in as a Farmer.`)
            setShowModal(false)
        }else{
            if(UserID && Token){
                try{
                    const buyerIDasFarmer = localStorage.getItem('FarmerId')
                    const UserBuyerID = localStorage.getItem('UserId')
                    // const uniqueId = uuidv4();
                    if(buyerIDasFarmer === selectedProduct.farmerId){
                        toast.error(`You can't Buy your own Product`)
                        setShowModal(false)
                        return
                    }
                    
                    const AddOrderInUserOrders = await axios.post(`http://localhost:5000/myOrderUpdateUser?BuyerId=${UserID}`,{
                        farmerId: selectedProduct.farmerId,
                        buyerId: UserID,
                        // userOrder: uniqueId,
                        title: selectedProduct.title,
                        price: selectedProduct.rate,
                        quantity: quantity,
                        farmLocation: selectedProduct.farmLocation[0],
                        // orderDate: Date.now,
                        status: "Pending",
                        buyRequests: "Requested"
                    })
                    console.log("kite", AddOrderInUserOrders)
                    
                        const USERiD = AddOrderInUserOrders.data.newOrderID
                        // setUserOrder(USERiD)
                        console.log("UseR",USERiD)
                    
                    
                    const buy = await axios.post(`http://localhost:5000/buyRequest?SellerId=${selectedProduct.farmerId}`,{
                        farmerId: selectedProduct.farmerId,
                        buyerId: UserID,
                        userOrder: USERiD,
                        title: selectedProduct.title,
                        price: selectedProduct.rate,
                        quantity: quantity,
                        // orderDate: Date.now,
                        status: "Pending",
                        buyRequests: "Requested"
                    })
                    console.log("Location: ",selectedProduct.farmLocation[0])
                    
                    if(!AddOrderInUserOrders){
                        console.log("Hello",AddOrderInUserOrders)
                    }
                    if(buy.status === 200 && AddOrderInUserOrders.status === 200){
                        toast.success(`Confirm purchase of ${quantity} units of ${selectedProduct.title}`)
                        setShowModal(false)
                        setQuantity(1)
                    }else{
                        toast.error(`Failed to send Buy request`)
                        setShowModal(false)
                    }
        
                }catch(err){
                    console.log("eRRor", err)
                }
            }else{
                toast.error(`Do Signup To buy anything `)
                setShowModal(false)
            }
        }
        
    }
    const HandleOut = (e)=>{
        if(e.target === e.currentTarget){
            // setSelectedProduct(null)
            setShowModal(false)
        }
    }
    return (
        <div className="min-h-0 bg-green-700 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {pre.map((product,index) => (
                <div
                    key={index}
                    className="bg-green-800 p-4 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 duration-300"
                >
                    <img
                        src={product.imageURL}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.title}</h3>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-green-700 font-bold mt-3">${product.rate} per unit</p>
                    <p className="text-gray-500 text-sm mt-1">Broker: {product.Broker}</p>
                    <button
                        onClick={() => handleRequestToBuy(product)}
                        className="mt-4 bg-green-700 text-white py-2 px-5 rounded-full hover:bg-green-800 focus:outline-none transition-colors duration-300"
                    >
                        Request to Buy
                    </button>
                </div>
            ))}
            {
                fetched ? <></>
                    :
                    <>
                        {products.map((product,index) => (
                            <div
                                key={index}
                                className="bg-white  p-4 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 duration-300"
                            >
                                {/* <img
                                    src={product.imageURL}
                                    alt={product.title}
                                    className="w-full h-40 object-cover rounded-md"
                                /> */}
                                {isValidURL(product.imageURL) ? (
                                    <img
                                        src={product.imageURL}
                                        alt={product.title || 'Product Image'}
                                        className="shadow-xl w-full max-h-36 object-cover rounded"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        className='w-full h-24 text-green-600'
                                        icon={faSeedling}
                                    />
                                )}
                                <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.title}</h3>
                                <p className="text-gray-600 mt-2">{product.description}</p>
                                <p className="text-green-700 font-bold mt-3">Rs: {product.rate} per kg</p>
                                <p className="text-gray-500 text-sm mt-1"><span className='font-medium'>Farm Location: </span> {product.farmLocation.map((loc,k)=>{ return <li key={k}>{loc.state}, District- {loc.district} Pincode-{loc.pincode}</li>})}</p>
                                <button
                                    onClick={() => handleRequestToBuy(product)}
                                    className="mt-4 bg-green-600 text-white py-2 px-5 rounded-full hover:bg-green-500 focus:outline-none transition-colors duration-300"
                                >
                                    Request to Buy
                                </button>
                            </div>
                        ))}
                    </>
            }

            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
                    onClick={HandleOut}
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Buy {selectedProduct.title}</h2>
                        <p className="text-gray-600 mb-4">Price: Rs {selectedProduct.rate} per kg</p>
                        
                        <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <p className='text-gray-500 pl-2'>in kg</p>
                        
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPurchase}
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
                            >
                                Confirm Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster/>
        </div>
    )
}

export default Marketplace;
