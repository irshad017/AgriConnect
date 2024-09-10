// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAppleWhole, faCarrot, faCrown, faDeleteLeft, faEgg, faJarWheat, faLeaf, faLemon, faPlateWheat, faRemove, faRemoveFormat, faSeedling, faSun, faTrash, faWater, faWheatAlt, faWheatAwn, faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons';


// const isValidURL = (urlString) => {
//     try {
//         new URL(urlString);
//         return true;
//     } catch (_) {
//         return false;
//     }
// };

// const ProductManager = () => {
//     const [products, setProducts] = useState([]);
//     const [title, setTitle] = useState('');
//     const [rate, setRate] = useState('');
//     const [description, setDescription] = useState('');
//     const [imageURL, setImageURL] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [fetched, setFetched] = useState(true);
//     const [DelFetch, setDelFetch] = useState(false)
//     const [imageURLCheck,setImageURLCheck] = useState('')
//     const isValidImageURL = isValidURL(imageURLCheck);
//     // Fetch products on component mount
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const farmerID = localStorage.getItem('FarmerId')
//                 // console.log(farmerID)
//                 const response = await axios.get(`http://localhost:5000/addProduct?farmerId=${farmerID}`);
//                 const items = response.data?.farmerData?.productSell
//                 // console.log("out",items)
//                 if(items && items.length > 0){
//                     console.log("in",items)
//                     setProducts(items);
//                     setFetched(false)
//                 }else{
//                     console.log('No Farmer Product data found');
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//         fetchProducts();
//     }, [DelFetch]);
    
//     const handleAddProduct = async (productId, farmerId) => {
//         if(title === "" || rate === "" || quantity === ""){
//             toast.error("Please Fill all details!")
//             console.log("Please Fill Properly")
//         }else{
//             try {
//                 const farmerId = localStorage.getItem('FarmerId')
//                 const updatedProduct = { farmerId, title, description, rate, imageURL, quantity };
                
//                 await axios.post(`http://localhost:5000/updateProduct/${farmerId}`, 
//                     updatedProduct
//                 );
                
//                 // Refresh product list
//                 const response = await axios.get(`http://localhost:5000/addProduct?farmerId=${farmerId}`);
//                 setProducts(response.data?.farmerData?.productSell);
                
//                 // Clear form fields
//                 setTitle('');
//                 setDescription('');
//                 setRate('');
//                 setImageURL('');
//             } catch (error) {
//                 console.error('Error updating product:', error);
//             }
//         }
//     };

//     const HandleDelete = async (productID)=>{
//         console.log("ProductID: ",productID)
//         const ID = localStorage.getItem("FarmerId")
//         console.log("ID: ",ID)
//         try{
//             const response = await axios.delete(`http://localhost:5000/deleteMyProduct?farmerId=${ID}&productId=${productID}`)
//             if(response.status === 200){
//                 toast.success(`Deleted Product`)
//                 setDelFetch(prev => !prev)
//             }
//         }catch(err){
//             console.log("ERROr:", err)
//             // toast.error(`Not Deleted Product`)
//         }
//     }

    

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Product Manager</h1>
//                 <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {/* <div className= "min-h-60  bg-gray-200 p-4 rounded-lg shadow-md"> */}
//                     <div className= "min-h-60  hover:border-black hover:cursor-pointer p-4 bg-white shadow-lg transition-all duration-200 ease-in-out rounded-lg shadow-md">
//                         <form onSubmit={handleAddProduct} className="mb-6 space-y-2">
                        
//                                 <input 
//                                     className='w-full h-8 px-2 border-2 border-gray-300 shadow-lg bg-gray-100 rounded'
//                                     type='text' placeholder='ImageURL'
//                                         value={imageURL}
//                                         onChange={(e) => setImageURL(e.target.value)}
//                                     ></input>                                
//                                 <input 
//                                     className="w-full h-7 px-2 text-xl font-bold mt-2 border-2 border-gray-300 shadow-lg bg-gray-100 rounded"
//                                     type='text' placeholder='Title'
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                     ></input> 
//                                 <div className='flex space-x-2'>
//                                     <textarea
//                                         className="min-h-24 min-w-48 text-gray-700 border-2 border-gray-300 shadow-lg bg-gray-100 rounded"
//                                         type='text' placeholder='Description'
//                                         value={description}
//                                         onChange={(e) => setDescription(e.target.value)}
//                                     >
//                                     </textarea>
//                                     <div>
//                                         <input
//                                             className="w-32 h-8 px-2 text-green-700 font-bold mt-2 border-2 shadow-lg border-gray-300 bg-gray-100 rounded"
//                                             type='number' placeholder='Rupees/kg'
//                                             value={rate}
//                                             onChange={(e) => setRate(e.target.value)}
//                                             ></input>
//                                         <input 
//                                             className="w-32 h-8 px-2 text-green-700 font-bold mt-2 border-2 shadow-lg border-gray-300 bg-gray-100 rounded"
//                                             type='text' placeholder='Quantiy in Kg'
//                                             value={quantity}
//                                             onChange={(e) => setQuantity(e.target.value)}
//                                         ></input>
//                                     </div>
//                                 </div>
//                             <button
//                                 type="submit"
//                                 className="relative top-1 left-2 bg-blue-500 shadow-lg text-white py-2 px-4 rounded"
//                             >
//                                 Add Product
//                             </button>
//                         </form>
//                     </div>

//                     {
//                         fetched ? <></>
//                             :<>
//                             {products.slice().reverse().map((product) => (
                                
//                                 <div key={product._id} onLoad={setImageURLCheck(product.imageURL)} className="min-h-72 p-4 rounded-lg shadow-md">
//                                     {
//                                         isValidImageURL ? <img
//                                             src={product.imageURL}
//                                             // alt={product.title}
//                                             className="w-full bg-red-500 min-h-0 max-h-36 object-cover rounded"
//                                         />  :                          
//                                         <FontAwesomeIcon className='w-full h-24 text-green-600 object-cover rounded' icon={faSeedling} ></FontAwesomeIcon>
//                                     }
                                                                        
//                                     <div className='flex'>
//                                         <h3 className="text-gray-600 text-xl font-bold mt-2">{product.title}</h3>
//                                         <button 
//                                             className='relative top-2 text-xl text-gray-800 left-60'
//                                             onClick={() => HandleDelete(product._id)}                                    
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faTrash} ></FontAwesomeIcon>
//                                         </button>
//                                     </div>
//                                     <p className="text-gray-700 ">{product.description}</p>
//                                     <p className="text-green-700 font-bold mt-2">Price: {product.rate} / kg</p>
//                                     <p className="text-green-700 font-bold mt-2">Quantity in kg: {product.quantity}</p>
//                                 </div>
//                             ))}
//                             </>
//                     }
//                     <Toaster/>
//                 </div>
//         </div>
//     );
// };

// export default ProductManager;







































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faTrash } from '@fortawesome/free-solid-svg-icons';

const isValidURL = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch (_) {
        return false;
    }
};

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [quantity, setQuantity] = useState('');
    const [fetched, setFetched] = useState(true);
    const [DelFetch, setDelFetch] = useState(false);
    const [ProFetch, setProFetch] = useState(false);
    const [FarmerData,setFarmerData] = useState([])
    const [pincode,setPincode] = useState('')
    const [State,setState] = useState('')
    const [District,setDistrict] = useState('')

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const farmerID = localStorage.getItem('FarmerId');
                const response = await axios.get(`http://localhost:5000/addProduct?farmerId=${farmerID}`);
                const items = response.data?.farmerData?.productSell;
                if (items && items.length > 0) {
                    setProducts(items);
                    setFetched(false);
                } else {
                    console.log('No Farmer Product data found');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        const FarmerDetail = async ()=>{
            try{
                const farmerID = localStorage.getItem('FarmerId')
                console.log("FarmerID: ",farmerID)
                if(farmerID){
                    const response = await axios.get(`http://localhost:5000/currentFarmerData?FarmerID=${farmerID}`)
                    if(response.status === 200){
                        const data = response.data.farmerData
                        const ordeR = data
                        console.log(data)
                        console.log(ordeR)
                        if(data.length > 0){
                            setFarmerData(ordeR)
                        }
                        if(ordeR.length > 0){
                            // setCustomers(ordeR)
                            setFetched(false)
                        }
                        // const Name = response.data.farmerData.email.split('@')[0]
                        const statE = response.data.farmerData.farmLocation
                        const sTaTe = statE[0].state
                        const District = statE[0].district
                        const Pincode = statE[0].pincode
                        console.log(statE[0].state)
                        console.log(statE[0].district)
                        // const districT = data.email
                        // const pincodE = data.email
                        if(sTaTe && District && Pincode){
                            setState(sTaTe)
                            setDistrict(District)
                            setPincode(Pincode)
                            console.log(State)
                            // setFetchFarm(false)

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
        FarmerDetail()
        fetchProducts();
    }, [DelFetch,ProFetch]);

    const handleAddProduct = async (event) => {
        event.preventDefault();
        if (title === "" || rate === "" || quantity === "" || description === "") {
            toast.error("Please Fill all details!");

            return;
        }
        try {
            const farmerId = localStorage.getItem('FarmerId');
            const updatedProduct = { 
                farmerId, 
                title, 
                description, 
                rate, 
                imageURL, 
                quantity,
                farmLocation: [{
                    pincode: parseInt(pincode, 10), // Ensure pincode is an integer
                    state: State,
                    district: District
                }] 
            };

            await axios.post(`http://localhost:5000/updateProduct/${farmerId}`, updatedProduct);

            // Refresh product list
            const response = await axios.get(`http://localhost:5000/addProduct?farmerId=${farmerId}`);
            setProducts(response.data?.farmerData?.productSell);
            if(response.status === 200){
                toast.success('Added')
                setProFetch((prev) => !prev)
            }
            // Clear form fields
            setTitle('');
            setDescription('');
            setRate('');
            setImageURL('');
            setQuantity('');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (productID) => {
        try {
            const ID = localStorage.getItem("FarmerId");
            const response = await axios.delete(`http://localhost:5000/deleteMyProduct?farmerId=${ID}&productId=${productID}`);
            if (response.status === 200) {
                toast.success(`Deleted Product`);
                setDelFetch((prev) => !prev);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error(`Failed to delete product`);
        }
    };

    return (
        <div>
            <h1 className="text-2xl text-center mt-2 font-bold mb-2">My Products for Sell</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="min-h-60 hover:border-black hover:cursor-pointer p-4 bg-gray-200 shadow-lg transition-all duration-200 ease-in-out rounded-lg">
                    <form onSubmit={handleAddProduct} className="mb-6 space-y-2">
                        <input
                            className='w-full h-8 px-2 border-2 border-gray-300 shadow-lg bg-gray-100 rounded'
                            type='text' placeholder='ImageURL'
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                        />
                        <input
                            className="w-full h-7 px-2 text-xl font-bold mt-2 border-2 border-gray-300 shadow-lg bg-gray-100 rounded"
                            type='text' placeholder='Product Name'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className='flex space-x-2'>
                            <textarea
                                className="px-1 min-h-24 min-w-24  w-auto text-gray-700 border-2 border-gray-300 shadow-lg bg-gray-100 rounded"
                                placeholder='Product Details'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div>
                                <input
                                    className="w-full h-8 px-2 text-green-700 font-bold mt-2 border-2 shadow-lg border-gray-300 bg-gray-100 rounded"
                                    type='number' placeholder='Rupees/kg'
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                />
                                <input
                                    className="w-full h-8 px-2 text-green-700 font-bold mt-2 border-2 shadow-lg border-gray-300 bg-gray-100 rounded"
                                    type='text' placeholder='Quantity in Kg'
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="relative top-1 left-2 bg-green-600 hover:bg-green-500 shadow-lg text-white py-2 px-4 rounded"
                        >
                            Add Product
                        </button>
                    </form>
                </div>

                {fetched ? null : products.slice().reverse().map((product) => (
                    <div key={product._id} className=" min-h-72 p-4 rounded-lg shadow-md">
                        {isValidURL(product.imageURL) ? (
                            <img
                                src={product.imageURL}
                                alt={product.title || 'Product Image'}
                                className="w-full max-h-36 object-cover rounded"
                            />
                        ) : (
                            <FontAwesomeIcon
                                className='w-full h-24 text-green-600'
                                icon={faSeedling}
                            />
                        )}
                            <button
                                className='relative top-8 left-72 text-xl text-gray-800'
                                onClick={() => handleDelete(product._id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        <div className='flex'>
                            <h3 className="text-gray-600 text-xl font-bold mt-2">{product.title}</h3>
                        </div>
                        <p className="text-gray-700 ">{product.description}</p>
                        <p className="text-green-700 font-bold mt-2">Price: {product.rate} / kg</p>
                        <p className="text-green-700 font-bold mt-2">Quantity in kg: {product.quantity}</p>
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    );
};

export default ProductManager;
