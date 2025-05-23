import { getNameInitials } from "@/utilities"
import { Avatar as AntdAvatar, AvatarProps, Flex } from "antd"

type Props = AvatarProps & {
    name?: string
}
const CustomAvatar = ({name, style, ...rest}: Props) => {
  return (
    <AntdAvatar
    alt = {'JavaScript Mastery'}
    size="small"
    style = {{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: "center",
        border: 'none',
        ...style
    }}
    {...rest}
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar
