jQuery(document).ready(function($) {
    var selectedImg;

    $('.img_upload_btn').click(function() {
        selectedImg = $(this).prev('input').attr('id');
        tb_show(objectL10n.select_image, 'media-upload.php?referer=_s-settings&type=image&TB_iframe=true&post_id=0', false);
        return false;
    });

    window.send_to_editor = function(html) {
        var image_url = $('img',html).attr('src');
        $('#' + selectedImg).val(image_url);
        $('#' + selectedImg + '_preview img').attr('src',image_url);

        tb_remove();

        $('#submit').trigger('click');
    }
});