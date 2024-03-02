import React from "react";


function Icon({ icon }: {icon: string}): React.ReactNode {
    return <i className={"fa fa-" + icon}></i>
}

export const UserIcon = (): React.ReactNode => <><Icon icon="user" /></>;
export const SignInIcon = (): React.ReactNode => <><Icon icon="sign-in" /></>;
export const SignOutIcon = (): React.ReactNode => <><Icon icon="sign-out" /></>;
export const HomeIcon = (): React.ReactNode => <><Icon icon="home" /></>;
export const DashboardIcon = (): React.ReactNode => <><Icon icon="dashboard" /></>;
export const PlusIcon = (): React.ReactNode => <><Icon icon="plus" /></>;
export const PlusCircleIcon = (): React.ReactNode => <><Icon icon="plus-circle" /></>;
export const EditIcon = (): React.ReactNode => <><Icon icon="edit" /></>;
export const CogIcon = (): React.ReactNode => <><Icon icon="cog" /></>;
export const TrashIcon = (): React.ReactNode => <><Icon icon="trash" /></>;
export const SearchIcon = (): React.ReactNode => <><Icon icon="search" /></>;
export const LockIcon = (): React.ReactNode => <><Icon icon="lock" /></>;
export const UnlockIcon = (): React.ReactNode => <><Icon icon="unlock" /></>;
export const HeartIcon = (): React.ReactNode => <><Icon icon="heart" /></>;
export const StarIcon = (): React.ReactNode => <><Icon icon="star" /></>;
export const CheckIcon = (): React.ReactNode => <><Icon icon="check" /></>;
export const TimesIcon = (): React.ReactNode => <><Icon icon="times" /></>;
export const ExclamationIcon = (): React.ReactNode => <><Icon icon="exclamation" /></>;
export const ExclamationTriangleIcon = (): React.ReactNode => <><Icon icon="exclamation-triangle" /></>;
export const InfoIcon = (): React.ReactNode => <><Icon icon="info" /></>;
export const QuestionIcon = (): React.ReactNode => <><Icon icon="question" /></>;
export const ListIcon = (): React.ReactNode => <><Icon icon="list" /></>;
export const CheckSquareIcon = (): React.ReactNode => <><Icon icon="check-square" /></>;
export const TimesSquareIcon = (): React.ReactNode => <><Icon icon="times-square" /></>;
export const PenSquareIcon = (): React.ReactNode => <><Icon icon="pen-square" /></>;
export const PlusSquareIcon = (): React.ReactNode => <><Icon icon="plus-square" /></>;
export const MinusSquareIcon = (): React.ReactNode => <><Icon icon="minus-square" /></>;
export const LinkIcon = (): React.ReactNode => <><Icon icon="link" /></>;
export const ExternalLinkIcon = (): React.ReactNode => <><Icon icon="external-link" /></>;
export const CodeIcon = (): React.ReactNode => <><Icon icon="code" /></>;
export const ColumnsIcon = (): React.ReactNode => <><Icon icon="columns" /></>;
export const CopyIcon = (): React.ReactNode => <><Icon icon="copy" /></>;
export const AngleUpIcon = (): React.ReactNode => <><Icon icon="angle-up" /></>;
export const AngleDownIcon = (): React.ReactNode => <><Icon icon="angle-down" /></>;
export const AngleLeftIcon = (): React.ReactNode => <><Icon icon="angle-left" /></>;
export const AngleRightIcon = (): React.ReactNode => <><Icon icon="angle-right" /></>;
export const CalendarMinus = (): React.ReactNode => <><Icon icon="calendar-minus-o" /></>;
// Add more icons as needed
