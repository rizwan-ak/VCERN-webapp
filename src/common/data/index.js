import icons from '../icons';
import states from './data.json';

export const statesList = Object.keys(states).map(key => key) ?? [];
export const citiesList = state => states[state] ?? [];

export const organizationSteps = ['Agent', 'Organization', 'Contact Person', 'Payment'];

export const memberSteps = ['Profile', 'Personal', 'Beneficiary', 'Payment'];

export const tosList = [
    'Newly registered users should be charged a yearly Administrative Fee.',
    'Then they are placed in a “Wait Pool” for 3 months and their account status should show “Pending” with the number of days remaining until they become “Active”.',
    'After the 3 months waiting period, new users should be moved into a “Live Pool” (1,000 members). At this point, he becomes a fully active Member, and his status should show “Active”.',
    'Simultaneously the new member credit card should be charged the initial Contribution ($1).',
    'To figure out how much each member must contribute, the Payout Amount should be divided by the number of Active Members in the pool. Look at the example above.',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
    'Such as: After that, every time a member dies in his pool, every member of that pool will be charged the Contribution amount ($1) and the deceased beneficiary will receive the Payout ($1000). ',
];

export const contributionFequencyList = ['Yearly', 'Monthly', 'Weekly', 'Daily'];

export const MembersMenu = [
    { title: 'Dashboard', href: 'dashboard', icon: icons.dashboard },
    { title: 'Messages', href: 'messages', icon: icons.messages },
    // { title: 'Invite', href: 'dashboard', icon: icons.invite },
    { title: 'Profile', href: 'profile', icon: icons.profile },
    { title: 'Payments', href: 'payments', icon: icons.payment },
    { title: 'Settings', href: 'settings', icon: icons.settings },
];

export const organizationsMenu = [
    { title: 'Dashboard', href: 'dashboard', icon: icons.dashboard },
    { title: 'Manage Groups', href: 'manage-groups', icon: icons.group },
    { title: 'Manage Member', href: 'manage-members', icon: icons.memberSettings },
    { title: 'Messages', href: 'messages', icon: icons.messages },
    { title: 'Tickets', href: 'tickets', icon: icons.ticket },
    { title: 'Payments', href: 'payments', icon: icons.payment },
    { title: 'Settings', href: 'settings', icon: icons.settings },
];

export const vcernMenu = [
    { title: 'Dashboard', href: 'dashboard', icon: icons.dashboard },
    { title: 'Manage Organizations', href: 'manage-organizations', icon: icons.group },
    { title: 'Manage Admins', href: 'manage-members', icon: icons.memberSettings },
    { title: 'Messages', href: 'messages', icon: icons.messages },
    { title: 'Tickets', href: 'tickets', icon: icons.ticket },
    { title: 'Articles/Blogs', href: 'blogs', icon: icons.blogs },
    { title: 'Requests', href: 'requests', icon: icons.requests },
    { title: 'Payments', href: 'payments', icon: icons.payment },
];

export const vcernAdminRoles = [
    { title: 'Admin', value: 'basic' },
    { title: 'Super Admin', value: 'super-admin' },
];

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getRoles = {
    admin: 'VCERN Admin',
    organization: 'Organization',
    member: 'Member',
};
