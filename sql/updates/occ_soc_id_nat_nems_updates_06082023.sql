INSERT INTO public.bls_soc_nem_id_cw(
	soc_nems_id, title, layer, matches)
	VALUES ('11-2031', 'Public Relations and Fundraising Managers', 'Minor Group', 2);
	
UPDATE public.occs
SET soc_nems_id = '11-2031'
WHERE soc_id IN ('11-2033.00','11-2032.00' );

