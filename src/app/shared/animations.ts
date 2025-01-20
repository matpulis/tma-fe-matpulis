import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
    ])
]);

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 100ms ease-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms 100ms ease-out', style({ opacity: 0, })),
    ]),
])

export const fadeInLeft = trigger('fadeInLeft', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('500ms 100ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
])

export const listAnimation = trigger('listAnimation', [
    transition('* => *', [
        query(
            ':enter',
            [
                style({ opacity: 0, transform: 'translateY(-20px)' }),
                stagger(100, [
                    animate(
                        '0.5s ease-out',
                        style({ opacity: 1, transform: 'translateY(0)' })
                    ),
                ]),
            ],
            { optional: true }
        ),
        query(
            ':leave',
            [
                stagger(100, [
                    animate(
                        '0.5s ease-in',
                        style({ opacity: 0, transform: 'translateY(20px)' })
                    ),
                ]),
            ],
            { optional: true }
        ),
    ]),
])