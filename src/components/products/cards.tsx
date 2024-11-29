import React from 'react'

export const ProductCard = ({ product, getStatusClass }) => {
    return (
        <div className='bg-white cursor-pointer custom-card flex flex-col hover:shadow-sm justify-end h-[360px] p-4' key={product.id}>
            <p className='my-2 text-left text-xl'>{product.name}</p>
            <div className='flex flex-wrap items-center justify-between'>
                <p className={`${getStatusClass(product.status)} border p-2 sm:p-1 text-xs w-4/12`}>{product.status}</p>
                <p className='text-sm md:text-base'>₦{product.price_per_unit} <span className='text-xs'>per {product?.unit || 'unit'}</span></p>
            </div>
        </div>
    )
}

