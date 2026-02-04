-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.budgets (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  category_id uuid NOT NULL,
  amount numeric NOT NULL,
  period character varying NOT NULL,
  start_date date NOT NULL,
  alert_threshold numeric DEFAULT 80.00,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT budgets_pkey PRIMARY KEY (id),
  CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT budgets_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  name character varying NOT NULL,
  color character varying,
  icon character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.installments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL,
  installment_number integer NOT NULL CHECK (installment_number > 0),
  amount numeric NOT NULL CHECK (amount > 0::numeric),
  due_date date NOT NULL,
  is_paid boolean DEFAULT false,
  paid_date date,
  paid_transaction_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT installments_pkey PRIMARY KEY (id),
  CONSTRAINT installments_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id),
  CONSTRAINT installments_paid_transaction_id_fkey FOREIGN KEY (paid_transaction_id) REFERENCES public.transactions(id)
);
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  type character varying NOT NULL CHECK (type::text = ANY (ARRAY['installment_reminder'::character varying, 'recurring_confirmation'::character varying, 'budget_alert'::character varying, 'other'::character varying]::text[])),
  title character varying NOT NULL,
  message text NOT NULL,
  related_id uuid,
  scheduled_for timestamp with time zone NOT NULL,
  is_sent boolean DEFAULT false,
  is_read boolean DEFAULT false,
  sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.payment_methods (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  alias character varying NOT NULL,
  last_digits character varying,
  type character varying DEFAULT 'credit_card'::character varying,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payment_methods_pkey PRIMARY KEY (id),
  CONSTRAINT payment_methods_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.recurring_transactions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  category_id uuid,
  payment_method_id uuid,
  type character varying NOT NULL CHECK (type::text = ANY (ARRAY['expense'::character varying, 'income'::character varying]::text[])),
  amount numeric NOT NULL CHECK (amount > 0::numeric),
  description text,
  frequency character varying NOT NULL CHECK (frequency::text = ANY (ARRAY['daily'::character varying, 'weekly'::character varying, 'biweekly'::character varying, 'monthly'::character varying, 'bimonthly'::character varying, 'quarterly'::character varying, 'yearly'::character varying]::text[])),
  start_date date NOT NULL,
  end_date date,
  next_occurrence date NOT NULL,
  is_active boolean DEFAULT true,
  requires_confirmation boolean DEFAULT true,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT recurring_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT recurring_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT recurring_transactions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT recurring_transactions_payment_method_id_fkey FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(id)
);
CREATE TABLE public.shopping_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  transaction_id uuid NOT NULL,
  category_id uuid,
  description character varying NOT NULL,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  quantity integer DEFAULT 1 CHECK (quantity > 0),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT shopping_items_pkey PRIMARY KEY (id),
  CONSTRAINT shopping_items_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id),
  CONSTRAINT shopping_items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  category_id uuid,
  payment_method_id uuid,
  type character varying NOT NULL CHECK (type::text = ANY (ARRAY['expense'::character varying, 'income'::character varying]::text[])),
  amount numeric NOT NULL CHECK (amount > 0::numeric),
  description text,
  transaction_date date NOT NULL DEFAULT CURRENT_DATE,
  has_installments boolean DEFAULT false,
  total_installments integer,
  installment_amount numeric,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT transactions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
  CONSTRAINT transactions_payment_method_id_fkey FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(id)
);