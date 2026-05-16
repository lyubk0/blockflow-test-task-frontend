export interface OnboardingData {
	wish: string | null
	currentWeight: { value: number; unit: 'lbs' | 'kg' } | null
	goalWeight: { value: number; unit: 'lbs' | 'kg' } | null
}
