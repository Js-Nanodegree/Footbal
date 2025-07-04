export type AvatarSize = 'small' | 'medium' | 'large';
export type AvatarShape = 'circle' | 'square';
export type AvatarColorVariant = 'default' | 'primary' | 'secondary' | 'gray';
export type AvatarStatus = 'online' | 'offline' | 'busy' | undefined;

export interface AvatarProps
{
    src?: string;
    initials?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
    border?: boolean;
    colorVariant?: AvatarColorVariant;
    status?: AvatarStatus;
    style?: any;
} 