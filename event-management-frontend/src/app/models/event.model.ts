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
  // pricing removed: events are free
  category: string;
  capacity: number;
  attendees?: number;
  waitingListEnabled?: boolean;
  requiresApproval?: boolean;
  posterUrl?: string;
  creator: User;
  location?: Location;
  tags?: Tag[];
}

export interface EventCategory {
  name: string;
  posterUrl?: string;
  description: string;
  startDate: string;
  endDate: string;
  isPrivate?: boolean;
  isVirtual?: boolean;
  virtualLink?: string;
  location?: Location;
}

export interface Participation {
  id?: number;
  event : AppEvent;
  status: ParticipationStatus;
  user: User;
}

export interface Subscriber {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
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
  name: string;
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
export interface ParticipationDTO {
  id?: number;
  user: User;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  eventId: number;
  eventTitle: string;
  status: ParticipationStatus;
  registrationDate?: string;
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


export interface TimezoneOption {
  name: string;
  offset: string;
  city: string;
}
// CurrencyOption removed — all events are free now.