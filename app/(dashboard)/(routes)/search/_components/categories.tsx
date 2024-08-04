import { Category } from '@prisma/client'
import React from 'react'

interface CategoriesProps {
    items: Category[];
}

const Categories = ({items}: CategoriesProps) => {
  return (
    <div>Categories</div>
  )
}

export default Categories