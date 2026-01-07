import * as Icons from 'lucide-react'

export const getIcon = (iconName) => {
  const IconComponent = Icons[iconName] || Icons.Package
  return IconComponent
}

