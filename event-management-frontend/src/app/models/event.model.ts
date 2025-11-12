/**
 * Event Model - Matches Event.java
 */
export interface AppEvent {
  id?: number;
  title: string;
  description: string;
  creationDate?: string;
  startDate: string;
  endDate: string;
  isPrivate?: boolean;
  isVirtual?: boolean;
  virtualLink?: string;
  capacity: number;
  waitingListEnabled?: boolean;
  requiresApproval?: boolean;
  creator: User;
  location: Location;
  tags?: Tag[];
}

/**
 * User Model - Matches User.java
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  authType?: string;
  provider?: string;
  providerId?: string;
  avatarUrl?: string;
}

/**
 * Location Model - Matches Location.java
 */
export interface Location {
  id?: number;
  name: string;
  street: string;
  city: string;
  region?: string;  // État/province
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  placeId?: string;  // ID provider
  additionalInfos?: string;  // Building number, etc.
}

/**
 * Tag Model - Matches Tag.java
 */
export interface Tag {
  id?: number;
  tagName: string;
}

/**
 * Notification Model - Matches Notification.java
 */
export interface Notification {
  id?: number;
  message: string;
  isRead: boolean;
  createdAt?: string;
  user: User;
}

/**
 * Participation Model - Matches Participation.java
 */
export interface Participation {
  id?: number;
  user: User;
  event: AppEvent;
  registrationDate?: string;
  status?: ParticipationStatus;
}

/**
 * ParticipationStatus Enum - Matches ParticipationStatus.java
 */
export enum ParticipationStatus {
  CONFIRMED = 'CONFIRMED',
  WAITING = 'WAITING',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  ATTENDED = 'ATTENDED'
}
