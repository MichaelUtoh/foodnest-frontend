import React from 'react'
import { ProductCardType } from '../types/products'
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product, getStatusClass }: ProductCardType) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div
            className='bg-white cursor-pointer flex flex-col hover:shadow-sm justify-end h-[360px] p-4'
            key={product.id}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <p className='my-2 text-left text-xl'>{product.name}</p>
            <div className='flex flex-wrap items-center justify-between'>
                <p className={`${getStatusClass(product.status)} border p-2 sm:p-1 text-xs w-4/12`}>{product.status}</p>
                <p className='text-sm md:text-base'>₦{product.price_per_unit} <span className='text-xs'>per {product?.unit || 'unit'}</span></p>
            </div>
        </div>
    )
}

