import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";



interface AuthState {
    user: User | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
}

export const AuthStore = signalStore(
    { providedIn: 'root' },
    // State
    withState(initialState),
    // Methods
    withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
        InitAuth() {
            const data = localStorage.getItem('auth.user')
            patchState(store, { user: data ? JSON.parse(data) : null })
        },

        Login(email: string, password: string) {
            if (store.user() === null) {
                patchState(store, { loading: true });

                // Update the state
                authService.Login(email, password).subscribe(user => patchState(store, { user, loading: false }))

                // Redirect to Home
                router.navigate(['']);

                // Persist in localstorage to simulate a session
                localStorage.setItem('auth.user', JSON.stringify(store.user()))
            }
        },

        Logout() {
            if (store.user() !== null) {
                authService.Logout().subscribe(() => patchState(store, { user: null, loading: false }))

                // Persist in localstorage to simulate a session
                localStorage.removeItem('auth.user')
            }
        },
    })),
    // Computed props
    withComputed((state) => ({
        isAuthenticated: computed(() => {
            return state.user() !== null
        }),
    }))
);