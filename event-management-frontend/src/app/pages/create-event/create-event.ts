import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event';
import { AuthService } from '../../services/auth/auth.sevice';
import { AppEvent, Location } from '../../models/event.model';
import { CurrencyOption } from '../../models/event.model';
import { TimezoneOption } from '../../models/event.model';




@Component({
  selector: 'app-create-event',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css',
})
export class CreateEvent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Event data
  eventName = '';
  description = '';
  startDate = '';
  startTime = '00:30';
  endDate = '';
  endTime = '01:30';
  
  // Timezone - will be set to user's browser timezone in ngOnInit
  selectedTimezone!: TimezoneOption;
  timezoneSearch = '';
  showTimezoneDropdown = false;
  
  // Calendar
  showStartCalendar = false;
  showEndCalendar = false;
  calendarMonth = new Date().getMonth();
  calendarYear = new Date().getFullYear();
  
  // Event type
  eventType: 'virtual' | 'in-person' = 'in-person';
  showEventTypeDropdown = false;
  virtualLink = '';
  
  // Location for in-person
  locationSearch = '';
  showLocationDropdown = false;
  locationResults: any[] = [];
  selectedLocation: Location | null = null;
  additionalLocationInfo = '';
  private locationSearchTimeout: any = null;
  isSearchingLocation = false;
  
  // Price
  price = 0;
  currency: CurrencyOption = { code: 'USD', name: 'US Dollar', symbol: '$' };
  currencySearch = '';
  showPriceModal = false;
  showCurrencyDropdown = false;
  
  // Validation
  requiresApproval = false;
  
  // Capacity
  capacity: number | null = null;
  isCapacityLimited = false;
  waitingListEnabled = false;
  showCapacityModal = false;
  tempCapacity = 50;
  tempWaitingList = false;
  tempCapacityLimited = false;
  
  // Image
  defaultPosterUrl = 'assets/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg';
  posterUrl = '';
  posterFile: File | null = null;
  posterPreview = '';
  
  // Category
  category: 'Party' | 'Learn' | 'Chill' | 'Active' | 'Create' | 'Connect' = 'Party';
  showCategoryDropdown = false;
  categories: { value: 'Party' | 'Learn' | 'Chill' | 'Active' | 'Create' | 'Connect'; label: string; description: string }[] = [
    { value: 'Party',  label: 'Party',  description: 'Social events, nightlife, celebrations' },
    { value: 'Learn',  label: 'Learn',  description: 'Workshops, talks, conferences' },
    { value: 'Chill',  label: 'Chill',  description: 'Relaxed meetups, casual hangouts' },
    { value: 'Active', label: 'Active', description: 'Sports, fitness, outdoor activities' },
    { value: 'Create', label: 'Create', description: 'Art, music, coding, making things' },
    { value: 'Connect',label: 'Connect',description: 'Networking, community, meet & greet' },
  ];
  
  // Timezones list - dynamically generated
  timezones: TimezoneOption[] = [];
  
  // Currencies list - dynamically generated
  currencies: CurrencyOption[] = [];

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Generate timezones and currencies from Intl API
    this.generateTimezones();
    this.generateCurrencies();
    
    // Set default dates to today
    const now = new Date();
    this.startDate = this.formatDateForInput(now);
    this.endDate = this.formatDateForInput(now);
    
    // Detect user's timezone
    this.detectUserTimezone();
  }

  selectCategory(value: 'Party' | 'Learn' | 'Chill' | 'Active' | 'Create' | 'Connect'): void {
    this.category = value;
    this.showCategoryDropdown = false;
  }

  generateTimezones(): void {
    try {
      // Get all supported timezones from Intl API
      const timezoneNames = (Intl as any).supportedValuesOf('timeZone') as string[];
      
      this.timezones = timezoneNames.map(tz => {
        // Get the offset for this timezone
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en', {
          timeZone: tz,
          timeZoneName: 'shortOffset'
        });
        const parts = formatter.formatToParts(now);
        const offsetPart = parts.find(p => p.type === 'timeZoneName');
        const offset = offsetPart?.value || 'GMT';
        
        // Extract city name (last part of timezone, e.g., "America/New_York" -> "New York")
        const city = tz.split('/').pop()?.replace(/_/g, ' ') || tz;
        
        return {
          name: tz,
          offset: offset,
          city: city
        };
      });
    } catch (e) {
      // Fallback for older browsers
      console.warn('Could not generate timezones, using fallback');
    }
  }

  generateCurrencies(): void {
    try {
      // Get all supported currencies from Intl API
      const currencyCodes = (Intl as any).supportedValuesOf('currency') as string[];
      const displayNames = new Intl.DisplayNames(['en'], { type: 'currency' });
      
      this.currencies = currencyCodes.map(code => {
        // Get currency symbol
        let symbol = code;
        try {
          const formatted = new Intl.NumberFormat('en', {
            style: 'currency',
            currency: code,
            currencyDisplay: 'narrowSymbol'
          }).format(0);
          symbol = formatted.replace(/[\d.,\s]/g, '').trim() || code;
        } catch {
          symbol = code;
        }
        
        return {
          code: code,
          name: displayNames.of(code) || code,
          symbol: symbol
        };
      });
      
      // Move common currencies to the top
      const commonCurrencies = ['USD', 'EUR', 'MAD', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];
      this.currencies.sort((a, b) => {
        const aIndex = commonCurrencies.indexOf(a.code);
        const bIndex = commonCurrencies.indexOf(b.code);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.name.localeCompare(b.name);
      });
    } catch (e) {
      // Fallback for older browsers
      console.warn('Could not generate currencies, using fallback');
      
    }
  }

  detectUserTimezone(): void {
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offsetMinutes = new Date().getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
      const offsetMins = Math.abs(offsetMinutes % 60);
      const sign = offsetMinutes <= 0 ? '+' : '-';
      const offsetStr = `GMT${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;
      
      // Extract city name from timezone (e.g., "Africa/Casablanca" -> "Casablanca")
      const cityName = userTimezone.split('/').pop()?.replace(/_/g, ' ') || userTimezone;
      
      // Check if timezone exists in our list
      const existingTz = this.timezones.find(tz => 
        tz.city.toLowerCase() === cityName.toLowerCase() ||
        userTimezone.toLowerCase().includes(tz.city.toLowerCase())
      );
      
      if (existingTz) {
        this.selectedTimezone = existingTz;
      } else {
        // Create a new timezone entry for the user's timezone
        this.selectedTimezone = {
          name: userTimezone,
          offset: offsetStr,
          city: cityName
        };
        // Add to the list if not exists
        this.timezones.unshift(this.selectedTimezone);
      }
    } catch (e) {
      // Fallback to default if detection fails
      console.warn('Could not detect timezone, using default');
    }
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDateDisplay(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

  // Calendar methods
  get monthName(): string {
    const date = new Date(this.calendarYear, this.calendarMonth);
    return date.toLocaleDateString('en-US', { month: 'long' });
  }

  get calendarDays(): (number | null)[] {
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);
    const lastDay = new Date(this.calendarYear, this.calendarMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week (0=Sunday, adjust for Monday start)
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    
    const days: (number | null)[] = [];
    
    // Add previous month days
    const prevMonthLastDay = new Date(this.calendarYear, this.calendarMonth, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(null); // null for previous month days (grayed out)
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    // Add next month days to fill the grid
    const remaining = 42 - days.length;
    for (let i = 0; i < remaining; i++) {
      days.push(null);
    }
    
    return days;
  }

  get previousMonthDays(): number[] {
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    
    const prevMonthLastDay = new Date(this.calendarYear, this.calendarMonth, 0).getDate();
    const days: number[] = [];
    
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(prevMonthLastDay - i);
    }
    
    return days;
  }

  prevMonth(): void {
    if (this.calendarMonth === 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else {
      this.calendarMonth--;
    }
  }

  nextMonth(): void {
    if (this.calendarMonth === 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    } else {
      this.calendarMonth++;
    }
  }

  openStartCalendar(): void {
    if (this.startDate) {
      const date = new Date(this.startDate);
      this.calendarMonth = date.getMonth();
      this.calendarYear = date.getFullYear();
    }
    this.showStartCalendar = true;
    this.showEndCalendar = false;
  }

  openEndCalendar(): void {
    if (this.endDate) {
      const date = new Date(this.endDate);
      this.calendarMonth = date.getMonth();
      this.calendarYear = date.getFullYear();
    }
    this.showEndCalendar = true;
    this.showStartCalendar = false;
  }

  selectDate(day: number | null, isStart: boolean): void {
    if (day === null) return;
    
    const selectedDate = this.formatDateForInput(new Date(this.calendarYear, this.calendarMonth, day));
    
    if (isStart) {
      this.startDate = selectedDate;
      this.showStartCalendar = false;
      // If end date is before start date, update it
      if (this.endDate < this.startDate) {
        this.endDate = this.startDate;
      }
    } else {
      this.endDate = selectedDate;
      this.showEndCalendar = false;
    }
  }

  isSelectedDate(day: number | null, isStart: boolean): boolean {
    if (day === null) return false;
    const dateStr = this.formatDateForInput(new Date(this.calendarYear, this.calendarMonth, day));
    return isStart ? this.startDate === dateStr : this.endDate === dateStr;
  }

  isToday(day: number | null): boolean {
    if (day === null) return false;
    const today = new Date();
    return day === today.getDate() && 
           this.calendarMonth === today.getMonth() && 
           this.calendarYear === today.getFullYear();
  }

  // Timezone methods
  get filteredTimezones(): TimezoneOption[] {
    if (!this.timezoneSearch) return this.timezones;
    const search = this.timezoneSearch.toLowerCase();
    return this.timezones.filter(tz => 
      tz.city.toLowerCase().includes(search) || 
      tz.name.toLowerCase().includes(search) ||
      tz.offset.toLowerCase().includes(search)
    );
  }

  selectTimezone(tz: TimezoneOption): void {
    this.selectedTimezone = tz;
    this.showTimezoneDropdown = false;
    this.timezoneSearch = '';
  }

  // Event type methods
  selectEventType(type: 'virtual' | 'in-person'): void {
    this.eventType = type;
    this.showEventTypeDropdown = false;
    if (type === 'virtual') {
      this.selectedLocation = null;
      this.locationSearch = '';
    } else {
      this.virtualLink = '';
    }
  }

  // Location search using Photon API (faster, free, based on OpenStreetMap)
  searchLocations(): void {
    // Clear previous timeout to debounce
    if (this.locationSearchTimeout) {
      clearTimeout(this.locationSearchTimeout);
    }

    if (this.locationSearch.length < 2) {
      this.locationResults = [];
      this.isSearchingLocation = false;
      return;
    }

    this.isSearchingLocation = true;

    // Debounce: wait 150ms before making the API call
    this.locationSearchTimeout = setTimeout(async () => {
      try {
        const query = encodeURIComponent(this.locationSearch);
        // Using Photon API - faster than Nominatim
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${query}&limit=5&lang=en`
        );
        
        if (!response.ok) throw new Error('Location search failed');
        
        const data = await response.json();
        
        this.locationResults = data.features.map((feature: any) => {
          const props = feature.properties;
          const coords = feature.geometry.coordinates;
          return {
            name: props.name || props.street || props.city || 'Unknown',
            address: [props.street, props.housenumber, props.city, props.state, props.country]
              .filter(Boolean).join(', '),
            city: props.city || props.town || props.village || props.municipality || '',
            country: props.country || '',
            postalCode: props.postcode || '',
            lat: coords[1],
            lon: coords[0]
          };
        });
        
        this.showLocationDropdown = this.locationResults.length > 0 || this.locationSearch.length >= 2;
      } catch (error) {
        console.error('Error searching locations:', error);
        this.locationResults = [];
        this.showLocationDropdown = false;
      } finally {
        this.isSearchingLocation = false;
      }
    }, 50);
  }

  selectLocation(loc: any): void {
    this.selectedLocation = {
      name: loc.name,
      street: loc.address,
      city: loc.city,
      country: loc.country,
      postalCode: loc.postalCode,
      latitude: loc.lat,
      longitude: loc.lon
    };
    this.locationSearch = loc.address;
    this.showLocationDropdown = false;
  }

  // Currency methods
  get filteredCurrencies(): CurrencyOption[] {
    if (!this.currencySearch) return this.currencies;
    const search = this.currencySearch.toLowerCase();
    return this.currencies.filter(c => 
      c.code.toLowerCase().includes(search) || 
      c.name.toLowerCase().includes(search)
    );
  }

  selectCurrency(curr: CurrencyOption): void {
    this.currency = curr;
    this.showCurrencyDropdown = false;
    this.currencySearch = '';
  }

  get priceDisplay(): string {
    if (this.price === 0) return 'Free';
    return `${this.currency.symbol}${this.price}`;
  }

  openPriceModal(): void {
    this.showPriceModal = true;
  }

  closePriceModal(): void {
    this.showPriceModal = false;
    this.showCurrencyDropdown = false;
  }

  confirmPrice(): void {
    this.showPriceModal = false;
    this.showCurrencyDropdown = false;
  }

  // Capacity methods
  get capacityDisplay(): string {
    if (!this.isCapacityLimited || this.capacity === null) return 'Unlimited';
    return `${this.capacity} seats`;
  }

  openCapacityModal(): void {
    this.tempCapacity = this.capacity || 50;
    this.tempWaitingList = this.waitingListEnabled;
    this.tempCapacityLimited = this.isCapacityLimited;
    this.showCapacityModal = true;
  }

  closeCapacityModal(): void {
    this.showCapacityModal = false;
  }

  confirmCapacity(): void {
    this.isCapacityLimited = this.tempCapacityLimited;
    this.capacity = this.tempCapacityLimited ? this.tempCapacity : null;
    this.waitingListEnabled = this.tempCapacityLimited ? this.tempWaitingList : false;
    this.showCapacityModal = false;
  }

  // Image upload
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.posterFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.posterPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.posterFile);
    }
  }

  removeImage(): void {
    this.posterFile = null;
    this.posterPreview = '';
    this.posterUrl = '';
  }

  // Form validation
  get isFormValid(): boolean {
    return (
      this.eventName.trim() !== '' &&
      this.startDate !== '' &&
      this.endDate !== '' &&
      (this.eventType === 'virtual' ? this.virtualLink.trim() !== '' : this.selectedLocation !== null)
    );
  }

  isSubmitting = false;

  // Create event
  createEvent(): void {
    console.log('Create event clicked');
    console.log('Form valid:', this.isFormValid);
    console.log('Event name:', this.eventName);
    console.log('Start date:', this.startDate);
    console.log('End date:', this.endDate);
    console.log('Event type:', this.eventType);
    console.log('Selected location:', this.selectedLocation);
    console.log('Virtual link:', this.virtualLink);
    
    if (!this.isFormValid) {
      console.log('Form is not valid');
      return;
    }

    this.isSubmitting = true;

    // Format timezone offset properly (e.g., "GMT+1" -> "+01:00", "GMT+05:30" -> "+05:30")
    const formatOffset = (offset: string): string => {
      // Remove "GMT" prefix
      let cleanOffset = offset.replace('GMT', '');
      if (!cleanOffset || cleanOffset === '') return '+00:00';
      
      // Handle formats like "+1", "+01", "+1:00", "+01:00"
      const match = cleanOffset.match(/^([+-])(\d{1,2})(?::(\d{2}))?$/);
      if (match) {
        const sign = match[1];
        const hours = match[2].padStart(2, '0');
        const minutes = match[3] || '00';
        return `${sign}${hours}:${minutes}`;
      }
      return cleanOffset;
    };

    const timezoneOffset = formatOffset(this.selectedTimezone.offset);
    const startDateTime = `${this.startDate}T${this.startTime}:00${timezoneOffset}`;
    const endDateTime = `${this.endDate}T${this.endTime}:00${timezoneOffset}`;

    const currentUser = this.authService.getCurrentUser();
    console.log('Current user:', currentUser);
    console.log('Start datetime:', startDateTime);
    console.log('End datetime:', endDateTime);

    // If there's a poster file, upload it first
    if (this.posterFile) {
      this.eventService.uploadPoster(this.posterFile).subscribe({
        next: (response) => {
          console.log('Poster uploaded:', response);
          this.submitEvent(startDateTime, endDateTime, currentUser, response.posterUrl);
        },
        error: (err) => {
          console.error('Failed to upload poster:', err);
          this.isSubmitting = false;
          alert('Error uploading image: ' + (err.error?.message || err.message || 'Unknown error'));
        }
      });
    } else {
      // No uploaded poster: use the default poster URL so it is persisted in backend
      this.submitEvent(startDateTime, endDateTime, currentUser, this.defaultPosterUrl);
    }
  }

  private submitEvent(startDateTime: string, endDateTime: string, currentUser: any, posterUrl: string): void {
    const event: AppEvent = {
      title: this.eventName,
      description: this.description,
      startDate: startDateTime,
      endDate: endDateTime,
      isVirtual: this.eventType === 'virtual',
      virtualLink: this.eventType === 'virtual' ? this.virtualLink : undefined,
      price: this.price,
      currency: this.currency.code,
      category: this.category,
      capacity: this.isCapacityLimited && this.capacity ? this.capacity : 0,
      waitingListEnabled: this.waitingListEnabled,
      requiresApproval: this.requiresApproval,
      posterUrl: posterUrl,
      creator: {
        id: currentUser?.id || 0,
        name: currentUser?.name || '',
        email: currentUser?.email || '',
      },
      location: this.eventType === 'in-person' && this.selectedLocation ? {
        ...this.selectedLocation,
        additionalInfos: this.additionalLocationInfo,
        timezone: this.selectedTimezone.offset,
      } : undefined,
    };

    console.log('Sending event:', event);

    this.eventService.createEvent(event).subscribe({
      next: (created) => {
        console.log('Event created:', created);
        this.isSubmitting = false;
        this.router.navigate(['/events', created.id]);
      },
      error: (err) => {
        console.error('Failed to create event:', err);
        this.isSubmitting = false;
        alert('Error creating event: ' + (err.error?.message || err.message || 'Unknown error'));
      }
    });
  }

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.timezone-dropdown')) {
      this.showTimezoneDropdown = false;
    }
    if (!target.closest('.category-dropdown')) {
      this.showCategoryDropdown = false;
    }
    if (!target.closest('.eventtype-dropdown')) {
      this.showEventTypeDropdown = false;
    }
    if (!target.closest('.location-dropdown')) {
      this.showLocationDropdown = false;
    }
    if (!target.closest('.currency-dropdown')) {
      this.showCurrencyDropdown = false;
    }
    if (!target.closest('.calendar-dropdown')) {
      this.showStartCalendar = false;
      this.showEndCalendar = false;
    }
  }
}
