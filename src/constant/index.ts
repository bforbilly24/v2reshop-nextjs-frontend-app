import {
  FOOTER_DATA as ECOMMERCE_FOOTER_DATA,
  type FooterDataItem,
  FOOTER_LOGO as ECOMMERCE_FOOTER_LOGO,
  type FooterLogoItem,
  FOOTER_CONTACT as ECOMMERCE_FOOTER_CONTACT,
  type FooterContactItem,
  FOOTER_GROUPS as ECOMMERCE_FOOTER_GROUPS,
  type FooterGroupItem,
  FOOTER_SOCIAL as ECOMMERCE_FOOTER_SOCIAL,
  FOOTER_LANGUAGES as ECOMMERCE_FOOTER_LANGUAGES,
  type FooterLinkItem,
} from '@/components/layouts/user/data/footer'
import {
  NAVBAR_CONFIG as ECOMMERCE_NAVBAR_CONFIG,
  NAV_LINKS as ECOMMERCE_NAV_LINKS,
  ACTION_LINKS as ECOMMERCE_ACTION_LINKS,
  type NavbarItem,
} from '@/components/layouts/user/data/navbar'
import {
  HEROSLIDERABOUT,
  type SlideItem,
  FAQABOUT,
  type FaqAboutItem,
  PARTNERS,
  type PartnerItem,
  PERKS,
  type PerkItem,
  TESTIMONIALS,
} from '@/features/about-us/data/about-us'
import {
  LoginRequest,
  LoginResponse,
  AuthUser,
} from '@/features/auth/data/auth'
import { CONTACT } from '@/features/contact/data/contact'
import {
  type LeafletMap,
  type OfficeData,
} from '@/features/contact/data/leaflet'
import {
  OFFICES,
  MAP_CONFIG,
  ICON_CONFIG,
} from '@/features/contact/data/office'
import {
  HEROSLIDERHOME,
  type SlideItem as HomeSlideItem,
  FEATURES,
  type FeatureItem,
  CATEGORIES as HOME_CATEGORIES,
  type CategoryItem as HomeCategoryItem,
  type ServiceItem,
} from '@/features/home/data/home'
import {
  COMMUNITIES,
  COMMUNITY_CATEGORIES,
  MEMBER_RANGES,
} from '@/features/recommunity/data/community'
import {
  type CommunityItem,
  type SidebarCommunityProps,
  type DetailedCommunityItem,
  type CommunityReview,
  type MemberRange,
  type CommunityCategory,
  mapSideCommunityToItems,
} from '@/features/recommunity/data/sidebar'
import {
  PRODUCTS,
  type ProductItem,
  CATEGORIES as ECOMMERCE_CATEGORIES,
  type CategoryItem as EcommerceCategoryItem,
  PRICES,
  type PriceItem,
  RATINGS,
  type RatingItem,
  CUSTOMIZATIONS as ECOMMERCE_CUSTOMIZATIONS,
  type CustomizationItem,
  SELECT_OPTIONS,
  SELECT_CATEGORIES,
  type SelectOptionItem,
  PAYMENTS,
  type PaymentItem,
  type EcommerceNavItem,
  getProducts,
  getProductById,
  getEcommerceNav,
  sortProducts,
} from '@/features/reproduct/data/product'
import { type SidebarProductProps } from '@/features/reproduct/data/sidebar'

export {
  // Auth
  type LoginRequest,
  type LoginResponse,
  type AuthUser,

  // Navbar Ecommerce
  ECOMMERCE_NAVBAR_CONFIG,
  ECOMMERCE_NAV_LINKS,
  ECOMMERCE_ACTION_LINKS,
  type NavbarItem,

  // Footer Ecommerce
  ECOMMERCE_FOOTER_DATA,
  type FooterDataItem,
  ECOMMERCE_FOOTER_LOGO,
  type FooterLogoItem,
  ECOMMERCE_FOOTER_CONTACT,
  type FooterContactItem,
  ECOMMERCE_FOOTER_GROUPS,
  type FooterGroupItem,
  ECOMMERCE_FOOTER_SOCIAL,
  ECOMMERCE_FOOTER_LANGUAGES,
  type FooterLinkItem,

  // Sidebar Product
  SidebarProductProps,

  // Home data
  HEROSLIDERHOME,
  HomeSlideItem,
  FEATURES,
  FeatureItem,
  HOME_CATEGORIES,
  HomeCategoryItem,
  ServiceItem,

  // About data
  HEROSLIDERABOUT,
  SlideItem,
  FAQABOUT,
  FaqAboutItem,
  PARTNERS,
  PartnerItem,
  PERKS,
  PerkItem,
  TESTIMONIALS,

  // Contact data
  CONTACT,
  OFFICES,
  MAP_CONFIG,
  ICON_CONFIG,
  LeafletMap,
  OfficeData,

  // E-commerce data
  PRODUCTS,
  ProductItem,
  ECOMMERCE_CATEGORIES,
  EcommerceCategoryItem,
  PRICES,
  PriceItem,
  RATINGS,
  RatingItem,
  ECOMMERCE_CUSTOMIZATIONS,
  CustomizationItem,
  SELECT_OPTIONS,
  SELECT_CATEGORIES,
  SelectOptionItem,
  PAYMENTS,
  PaymentItem,
  EcommerceNavItem,
  getProducts,
  getProductById,
  getEcommerceNav,
  sortProducts,

  // ReCommunity data
  COMMUNITIES,
  COMMUNITY_CATEGORIES,
  MEMBER_RANGES,

  // ReCommunity Sidebar
  type CommunityItem as ReCommunityItem,
  type SidebarCommunityProps as ReSidebarCommunityProps,
  type DetailedCommunityItem as ReDetailedCommunityItem,
  type CommunityReview as ReCommunityReview,
  type MemberRange as ReMemberRange,
  type CommunityCategory as ReCommunityCategory,
  mapSideCommunityToItems as mapReSideCommunityToItems,
}
