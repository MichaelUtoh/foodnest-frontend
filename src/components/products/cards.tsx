import React from 'react'
import { ProductCardType } from '../types/products'
import { useNavigate } from 'react-router-dom';
import { GiPowderBag } from 'react-icons/gi';

export const ProductCard = ({ product, getStatusClass }: ProductCardType) => {
    console.log(product);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div
            className='bg-white cursor-pointer flex flex-col hover:shadow-sm justify-end h-[360px]'
            key={product.id}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className='flex flex-grow items-center justify-center'>
                {
                    product?.images?.length !== 0
                        ? <img src={product?.images?.[0]?.url} alt={product?.images?.[0]?.alt_text} className='bg-contain' />
                        : <GiPowderBag className='text-gray-100 text-[200px]' />
                }
            </div>
            <div className='p-4'>
                <p className='my-2 text-left text-xl'>{product.name}</p>
                <div className='flex flex-wrap items-center justify-between'>
                    <p className={`${getStatusClass(product.status)} border p-2 sm:p-1 text-xs w-4/12`}>{product.status}</p>
                    <p className='text-sm md:text-base'>₦{product.price_per_unit} <span className='text-xs'>per {product?.unit || 'unit'}</span></p>
                </div>
            </div>
        </div>
    )
}

